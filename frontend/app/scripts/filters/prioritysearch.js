'use strict';

angular.module('osscdnApp').filter('prioritysearch', function() {
    return function(input, queries) {
        if(!queries) {
            return input;
        }

        var queryNames = Object.keys(queries);
        var qLen = queryNames.length;
        var scores = {};

        return input.filter(function(inp) {
            return queryNames.filter(function(k) {
                var ret = inp[k].indexOf(queries[k]);

                if(ret === 0) {
                    scores[inp[k]] = inp[k].length - queries[k].length;

                    return true;
                }
            }).length === qLen;
        });

        // XXX: this is problematic because it mutates the original somehow
        // ie. empty -> entry -> empty doesn't yield the same result!
        /*.sort(function(a, b) {
            // TODO: figure out a proper scoring function for multiple properties
            return scores[a[queryNames[0]]] >= scores[b[queryNames[0]]];
        });*/
    };
});
