var github = new (require('github'))({
    version: '3.0.0',
    protocol: 'https',
    timeout: 5000
});

function auth(token) {
    github.authenticate({
        type: 'oauth',
        token: token
    });

    return {
        getWatchers: getWatchers
    };
}
module.exports = auth;


function getWatchers(o, cb) {
    if(!o.user) {
        console.warn('Missing user', o);

        return cb();
    }
    if(!o.repo) {
        console.warn('Missing repo', o);

        return cb();
    }

    github.repos.get(o, function(err, d) {
        if(err) return cb(err);

        cb(null, d.watchers_count);
    });
}
