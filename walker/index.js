#!/usr/bin/env node
'use strict';

var version = require('./package.json').version;
var program = require('commander');

var utils = require('./utils');


main();

function main() {
    program.version(version).
        option('-i --input <directory>', 'input directory').
        option('-o --output <directory>', 'output directory').
        option('-c --config <file>', 'config file with credentials').
        parse(process.argv);

    if(!program.input) {
        return console.error('Missing input!');
    }
    if(!program.output) {
        return console.error('Missing output!');
    }

    var config = utils.getConfig(program.config);

    var lib = require('./lib')(config);

    lib.walk(
        program.input,
        utils.catchError(lib.write.bind(null, program.output, config.exclude))
    );
}
