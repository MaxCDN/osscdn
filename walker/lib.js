'use strict';

var fs = require('fs');
var path = require('path');

var glob = require('glob');
var async = require('async');
var walker = require('filewalker');

var utils = require('./utils');


module.exports = {
    walk: walk,
    write: write
};

function walk(root, cb) {
    glob(path.join(root, '/*/package.json'), function(err, files) {
        if(err) {
            return console.error(err);
        }

        async.map(files, function(file, cb) {
            var d = require('../' + file);
            var repoUrl = d.repositories && d.repositories[0] && d.repositories[0].url;

            if(!repoUrl && d.repository) {
                if(Array.isArray(d.repository)) {
                    d.repository = d.repository[0];
                }

                repoUrl = d.repository.url? d.repository.url: d.repository;
            }
            if(!repoUrl && d.homepage) {
                repoUrl = d.homepage;
            }

            if(!repoUrl) {
                console.warn(d.name + ' is missing a repo!');

                return cb();
            }

            var author = d.author || '';

            if(author.name) {
                author = author.name;
            }

            if(!author && d.maintainers) {
                author = d.maintainers[0].name;
            }

            if(Array.isArray(author)) {
                author = author.join(', ');
            }

            var gh = utils.parseGh(repoUrl);
            var ret = {
                author: author.split(' <')[0],
                name: d.name,
                version: d.version,
                description: d.description,
                homepage: d.homepage,
                keywords: d.keywords,
                github: 'https://github.com/' + gh.user + '/' + gh.repo
            };

            var cdn = {};
            ret.cdn = cdn;

            walker(path.dirname(file)).on('file', function(p) {
                if(utils.endsWith(p, 'package.json')) {
                    return;
                }

                var parts = p.split('/');

                if(parts.length < 2) {
                    return;
                }

                var version = parts[0];
                var f = parts.slice(1).join('/');

                if(!(version in cdn)) {
                    cdn[version] = [];
                }

                cdn[version].push(f);
            }).on('error', cb).on('done', cb.bind(null, null, ret)).walk();
        }, function(err, d) {
            if(err) {
                return cb(err);
            }

            cb(null, d.filter(utils.id));
        });
    });
}

function write(output, exclude, d) {
    exclude = exclude || [];

    d = d.filter(function(v) {
        return exclude.indexOf(v.name) === -1;
    });

    var indexData = utils.removeDuplicates('name', d.map(function(v) {
        return {
            name: v.name,
            stars: v.stars,
            hits: v.hits
        };
    }));

    fs.exists(output, function(exists) {
        if(exists) {
            writeData();
        }
        else {
            fs.mkdir(output, utils.catchError(writeData));
        }
    });

    function writeData() {
        fs.writeFile(path.join(output, 'index.json'), JSON.stringify(indexData), utils.catchError);

        async.eachSeries(d, function(v, cb) {
            fs.writeFile(path.join(output, v.name + '.json'), JSON.stringify(v), cb);
        }, utils.catchError);
    }
}
