'use strict';

angular.module('osscdnApp').directive('paginator', function () {
    return {
        restrict:'E',
        controller: function ($scope, Paginator) {
            $scope.paginator = Paginator;
        },
        templateUrl: 'views/paginationControl.html'
    };
});