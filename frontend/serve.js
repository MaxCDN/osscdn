#!/usr/bin/env node
/* jshint browser:false */

'use strict';

var path = require('path');
var express = require('express');
var h5bp = require('h5bp');

var staticMw = express['static'];


main();

function main() {
    var app = express();

    var port = process.env.PORT || 8000;
    var halfDay = 43200000;
    var day = halfDay * 2;
    var week = day * 7;

    app.configure(function() {
        app.set('port', port);

        app.use(express.logger('dev'));
        app.use(h5bp({root: path.join(__dirname, 'dist')}));
        app.use(express.compress());

        app.use(app.router);
    });

    app.configure('development', function() {
        app.use(express.errorHandler());
    });

    app.use('/dist/scripts', staticMw({maxAge: week}));
    app.use('/dist/styles', staticMw({maxAge: week}));

    app.use(staticMw(path.join(__dirname, 'dist'), {
        maxAge: halfDay
    }));

    app.use(function(req, res) {
        res.sendfile(__dirname + '/dist/index.html');
    });

    process.on('exit', terminator);

    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
    'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'
    ].forEach(function(element) {
        process.on(element, function() { terminator(element); });
    });

    app.listen(port, function() {
        console.log('%s: Node (version: %s) %s started on %d ...', Date(Date.now() ), process.version, process.argv[1], port);
    });
}

function terminator(sig) {
    if(typeof sig === 'string') {
        console.log('%s: Received %s - terminating Node server ...',
            Date(Date.now()), sig);

        process.exit(1);
    }

    console.log('%s: Node server stopped.', Date(Date.now()) );
}
