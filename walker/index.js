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
            // TODO: fetch stars and stats here
            cb(null, require('./' + file));
        }, function(err, d) {
            if(err) return console.error(err);

            // TODO: merge data now etc.
            console.log('data', d);
        });
    });
}
