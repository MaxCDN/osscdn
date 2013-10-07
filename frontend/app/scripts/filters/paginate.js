'use strict';

// paginator: http://cacodaemon.de/index.php?id=50
angular.module('osscdnApp').filter('paginate', function (Paginator) {
    return function(input, rowsPerPage) {
        if(!input) return input;

        if(rowsPerPage) Paginator.rowsPerPage = rowsPerPage;

        Paginator.itemCount = input.length;

        return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
    }
});