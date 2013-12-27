'use strict';

var trim = require('trimmer');


function getConfig(path) {
    try {
        return require('./' + path);
    } catch(e) {}

    return {
        github: '',
        exclude: []
    };
};
exports.getConfig = getConfig;

function parseGh(url) {
    if(!url) {
        return {};
    }

    var partitions = partition('github.com', url);

    if(partitions.length < 2) {
        partitions = partition('github.io', url);
    }
    if(partitions.length < 2) {
        return {};
    }
    if(url.indexOf('git@') === 0) {
        return parseGit(url);
    }
    if(partitions[0].split('//').filter(id).length > 1) {
        return parseGhPages(partitions);
    }

    var parts = partitions[1].split('/').filter(id);
    var user = parts[0];
    var repo = parseRepo(parts[1]);

    if(!user || !repo) {
        console.warn('Missing gh data', url, parts, user, repo);

        return {};
    }

    return {
        user: user,
        repo: repo
    };
}
exports.parseGh = parseGh;

function parseGit(url) {
    var parts = url.split(':').slice(1).join('').split('/');

    return {
        user: parts[0],
        repo: parseRepo(parts[1])
    };
}

function parseGhPages(parts) {
    return {
        user: trim.right(parts[0].split('//')[1], '.'),
        repo: trim(parts[1], '/')
    };
}

function parseRepo(str) {
    if(!str) {
        return;
    }

    var parts = str.split('.git');

    if(parts.length > 1) {
        return parts.slice(0, -1).join('');
    }

    return str;
}

function partition(chr, str) {
    if(!chr || !str) {
        return;
    }

    var parts = str.split(chr);

    var lPart = parts.shift();
    var rPart = parts.join(chr);

    return rPart? [lPart, rPart]: [lPart];
}
exports.partition = partition;

function catchError(fn) {
    return function(err, d) {
        if(err) {
            return console.error(err);
        }

        fn(d);
    };
}
exports.catchError = catchError;

function endsWith(str, a) {
    return str.indexOf(a) === str.length - a.length;
}
exports.endsWith = endsWith;

function id(a) {
    return a;
}
exports.id = id;
