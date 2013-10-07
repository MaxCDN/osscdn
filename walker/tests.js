#!/usr/bin/env node
var suite = require('suite.js');

var utils = require('./utils');


suite(utils.parseGh, [
    'foo', {},
    'git@github.com:jquery/jquery.git', {
        user: 'jquery',
        repo: 'jquery'
    },
    'https://github.com/mootools/mootools', {
        user: 'mootools',
        repo: 'mootools'
    },
    'https://github.com/prototype/prototype.git', {
        user: 'prototype',
        repo: 'prototype'
    },
    'https://github.com/peterwilli/CoolQueue.io', {
        user: 'peterwilli',
        repo: 'CoolQueue.io'
    },
    'git://github.com/angular-strap/angular-strap.git', {
        user: 'angular-strap',
        repo: 'angular-strap'
    },
    'https://github.com/nathansmith/960-Grid-System/blob/master/code/css/960.css', {
        user: 'nathansmith',
        repo: '960-Grid-System'
    }
]);