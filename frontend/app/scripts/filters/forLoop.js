'use strict';

angular.module('osscdnApp').filter('forLoop', function () {
    return function(input, start, end) {
        input = new Array(end - start);

        for(var i = 0; start < end; start++, i++) {
            input[i] = start;
        }

        return input;
    };
});
