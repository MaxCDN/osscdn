'use strict';

var app = angular.module('osscdnApp', ['ngAnimate']);

app.controller('InstantSearchController', ['$scope', '$http', function($scope, $http) {
    $http.get('data.json').then(function(res) {
        $scope.items = res.data;
    });
}]);