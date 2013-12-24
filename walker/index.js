#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var glob = require('glob');
var async = require('async');
var walker = require('filewalker');

var version = require('./package.json').version;
var program = require('commander');

var utils = require('./utils');
var gh;


main();

function main() {
    program.version(version).
        option('-i --input <directory>', 'input directory').
        option('-o --output <directory>', 'output directory').
        option('-c --config <file>', 'config file with credentials').
        parse(process.argv);

    if(!program.input) return console.error('Missing input!');
    if(!program.output) return console.error('Missing output!');

    var config = {github: '', exclude: []};

    try {
        config = require('./' + program.config);

        gh = require('./gh')(config.github);
    } catch(e) {
        console.warn('Configuration was not provided, generating dummy data for GH');

        gh = {
            getWatchers: function(o, cb) {
                cb(null, Math.round(Math.random() * 10000));
            }
        };
    }

    walk(program.input, utils.catchError(write.bind(null, program.output, config.exclude)));
}

function walk(root, cb) {
    glob(path.join(root, '/**/package.json'), function(err, files) {
        if(err) return console.error(err);

        async.map(files, function(file, cb) {
            var d = require('./' + file);
            var repoUrl = d.repositories && d.repositories[0] && d.repositories[0].url;

            if(!repoUrl && d.repository) {
                if(Array.isArray(d.repository)) d.repository = d.repository[0];

                repoUrl = d.repository.url? d.repository.url: d.repository;
            }
            if(!repoUrl && d.homepage) repoUrl = d.homepage;

            if(!repoUrl) {
                console.warn(d.name + ' is missing a repo!');

                return cb();
            }

            var author = d.author && d.author.name;

            if(!author && d.maintainers) {
                author = d.maintainers[0].name;
            }

            async.waterfall([
                function(cb) {
                    var ret = {
                        author: author,
                        name: d.name,
                        version: d.version,
                        description: d.description,
                        homepage: d.homepage,
                        keywords: d.keywords
                    };

                    cb(null, ret);
                },
                function(ret, cb) {
                    var ghQuery = utils.parseGh(repoUrl);

                    gh.getWatchers(ghQuery, function(err, stars) {
                        if(err) {
                            console.warn({err: err, ghQuery: ghQuery, repoUrl: repoUrl});

                            return cb(null, ret);
                        }

                        ret.github = repoUrl.split('.git')[0];
                        ret.stars = stars;

                        cb(null, ret);
                    });
                },
                function(ret, cb) {
                    var dirname = path.dirname(file);
                    var cdn = {};
                    ret.cdn = cdn;

                    walker(dirname).on('file', function(p) {
                        if(utils.endsWith(p, 'package.json')) return;

                        var parts = p.split('/');

                        if(parts.length < 2) return;

                        var version = parts[0];
                        var f = parts.slice(1).join('/');

                        if(!(version in cdn)) cdn[version] = [];

                        cdn[version].push(f);
                    }).on('error', cb).on('done', cb.bind(null, null, ret)).walk();
                },
                function(ret, cb) {
                    //ret.hits = 0; // TODO: fetch this through API

                    cb(null, ret);
                }
            ], cb);
        }, function(err, d) {
            if(err) return cb(err);

            cb(null, d.filter(utils.id));
        });
    });
}

function write(output, exclude, d) {
    exclude = exclude || [];

    d = d.filter(function(v) {
        return exclude.indexOf(v.name) === -1;
    });

    var indexData = d.map(function(v) {
        return {
            name: v.name,
            stars: v.stars,
            hits: v.hits
        };
    });

    fs.exists(output, function(exists) {
        if(exists) writeData();
        else fs.mkdir(output, utils.catchError(writeData));
    });

    function writeData() {
        fs.writeFile(path.join(output, 'index.json'), JSON.stringify(indexData), utils.catchError);

        async.eachSeries(d, function(v, cb) {
            fs.writeFile(path.join(output, v.name + '.json'), JSON.stringify(v), cb);
        }, utils.catchError);
    }
}
