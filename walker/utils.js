function parseGh(url) {
    if(!url) return {};

    var partitions = partition('github.com', url);

    // not a github repo
    if(partitions.length < 2) return {};

    if(url.indexOf('git@') == 0) {
        return parseGit(url);
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
    }
}

function parseRepo(str) {
    var parts = str.split('.git');

    if(parts.length > 1) return parts.slice(0, -1).join('');

    return str;
}

function partition(chr, str) {
    var parts = str.split(chr);

    var lPart = parts.shift();
    var rPart = parts.join(chr);

    return rPart? [lPart, rPart]: [lPart];
}
exports.partition = partition;

function catchError(fn) {
    return function(err, d) {
        if(err) return console.error(err);

        fn(d);
    };
}
exports.catchError = catchError;

function id(a) {
    return a;
}
exports.id = id;