#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var request = require('request');
var walker = require('filewalker');
var trim = require('trimmer');

var version = require('./package.json').version;
var program = require('commander');


main();

function main() {
    program.version(version).
        option('-i --input <directory>', 'input directory').
        option('-c --cdn <url>', 'cdn url').
        parse(process.argv);

    if(!program.input) return console.error('Missing input!');
    if(!program.cdn) return console.error('Missing cdn!');

    check(program.input, program.cdn);
}

function check(input, url) {
    walker(input).on('file', function(p) {
        fs.readFile(path.join(input, p), {
            encoding: 'utf-8'
        },function(err, d) {
            if(err) return console.error(err);

            var fileHash = md5(d);

            request(trim.right(url, '/') + '/' + p, function(err, res, d) {
                if(err) return console.error(err);

                var urlHash = md5(d);

                if(fileHash != urlHash) {
                    console.error('File and url hashes did not match for ' + p + '!');
                }
            });
        });
    }).on('error', function(err) {
        console.error(err);
    }).walk();
}

function md5(d) {
    return crypto.createHash('md5').update(d).digest('hex');
}