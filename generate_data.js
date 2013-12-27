#!/usr/bin/env node
'use strict';


function main() {
    var utils = require('./walker/utils');
    var config = utils.getConfig('config.js');

    var lib = require('./walker')(config);

    var input = './files';
    var output = './frontend/app/data/';

    lib.walk(
        input,
        utils.catchError(lib.write.bind(null, output, config.exclude))
    );
}

main();
