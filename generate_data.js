#!/usr/bin/env node
'use strict';

var lib = require('./walker');
var utils = require('./walker/utils');


function main() {
    var config = utils.getConfig('config.js');

    var input = './files';
    var output = './frontend/app/data/';

    lib.walk(
        input,
        utils.catchError(lib.write.bind(null, output, config.exclude))
    );
}

main();

