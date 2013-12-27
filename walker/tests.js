#!/usr/bin/env node
'use strict';

var assert = require('assert');

var suite = require('suite.js');

var utils = require('./utils');


assert.deepEqual(
    utils.removeDuplicates('name', [{name: 'bar'}, {name: 'bar'}]),
    [{name: 'bar'}]
);


suite(utils.parseGh, [
    'foo', {},
    'git://github.com/coolony/kiwi', {
        user: 'coolony',
        repo: 'kiwi'
    },
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
    },
    'http://fortawesome.github.com/Font-Awesome/', {
        user: 'fortawesome',
        repo: 'Font-Awesome'
    },
    'http://sapegin.github.io/social-likes/', {
        user: 'sapegin',
        repo: 'social-likes'
    }
]);