#!/usr/bin/env node
var path = require('path');

var glob = require('glob');
var async = require('async');
var github = new (require('github'))({
    version: '3.0.0',
    protocol: 'https',
    timeout: 5000
});


var TESTING;

main();

function main() {
    var root = process.argv[2];
    TESTING = process.argv[3];

    if(!root) return console.error('Missing input!');

    walk(root);
}

function walk(root) {
    glob(path.join(root, '/**/package.json'), function(err, files) {
        if(err) return console.error(err);

        async.map(files, function(file, cb) {
            var d = require('./' + file);

            if(!d.repositories || !d.repositories[0]) {
                console.warn(d.name + ' is missing a repo!');

                return cb();
            }

            async.waterfall([
                function(cb) {
                    var ret = {
                        name: d.name,
                        version: d.version,
                        description: d.description,
                        homepage: d.homepage,
                        keywords: d.keywords
                    };

                    cb(null, ret);
                },
                function(ret, cb) {
                    getWatchers(parseGh(d.repositories[0].url), function(err, stars) {
                        ret.stars = stars;

                        cb(null, ret);
                    });
                },
                function(ret, cb) {
                    var dirname = path.dirname(file);

                    glob(dirname + '/*/**/*', function(err, files) {
                        if(err) return cb(err);
                        var cdn = {};

                        files.forEach(function(f) {
                            var base = f.split(dirname + '/')[1];
                            var parts = base.split('/');
                            var version = parts[0];
                            var f = parts[1];

                            if(!(version in cdn)) cdn[version] = [];

                            cdn[version].push(f);
                        });

                        ret.cdn = cdn;

                        cb(null, ret);
                    });
                },
                function(ret, cb) {
                    // TODO: get statistics

                    cb(null, ret);
                }
            ], cb);
        }, function(err, d) {
            if(err) return console.error(err);

            console.log(JSON.stringify(d.filter(id)));
        });
    });
}

function parseGh(url) {
    if(!url) return {};

    var parts = url.split('https://github.com/').join('').split('/');

    return {
        user: parts[0],
        repo: parts[1].split('.')[0]
    };
}

function getWatchers(o, cb) {
    if(!o.user) {
        console.warn('Missing user', o);

        return cb();
    }
    if(!o.repo) {
        console.warn('Missing repo', o);

        return cb();
    }

    if(TESTING) return cb(null, Math.round(Math.random() * 10000));

    github.repos.get(o, function(err, d) {
        if(err) return cb(err);

        cb(null, d.watchers_count);
    });
}

function id(a) {
    return a;
}