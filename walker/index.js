#!/usr/bin/env node
var path = require('path');

var glob = require('glob');
var async = require('async');
var github = new (require('github'))({
    version: '3.0.0',
    protocol: 'https',
    timeout: 5000
});


main();

function main() {
    var root = process.argv[2];

    if(!root) {
        return console.error('Missing input!');
    }

    walk(root);
}

function walk(root) {
    glob(path.join(root, '/**/package.json'), function(err, files) {
        if(err) return console.error(err);

        async.map(files, function(file, cb) {
            var d = require('./' + file);

            getWatchers(parseGh(d.repositories[0].url), function(err, stars) {
                if(err) return cb(err);

                cb(null, {
                    name: d.name,
                    version: d.version,
                    description: d.description,
                    homepage: d.homepage,
                    keywords: d.keywords,
                    stars: stars,
                    statistics: {}, // TODO: fetch from max
                    cdn: [] // TODO: this should contain links to cdn
                });
            });
        }, function(err, d) {
            if(err) return console.error(err);

            console.log(d);
        });
    });
}

function parseGh(url) {
    var parts = url.split('https://github.com/').join('').split('/');

    return {
        user: parts[0],
        repo: parts[1].split('.')[0]
    };
}

function getWatchers(o, cb) {
    if(!o.user) return cb('Missing user');
    if(!o.repo) return cb('Missing repo');

    github.repos.get(o, function(err, d) {
        if(err) return cb(err);

        cb(null, d.watchers_count);
    });
}