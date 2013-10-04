#!/usr/bin/env node

var path = require('path');

var glob = require('glob');
var async = require('async');


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

            cb(null, {
                name: d.name,
                version: d.version,
                description: d.description,
                homepage: d.homepage,
                keywords: d.keywords,
                stars: 0, // TODO: fetch from gh based on project gh url
                statistics: {}, // TODO: fetch from max
                cdn: [] // TODO: this should contain links to cdn
            });
        }, function(err, d) {
            if(err) return console.error(err);

            console.log(d);
        });
    });
}
