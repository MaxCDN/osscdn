'use strict';

var app = angular.module('osscdnApp', ['ngAnimate']);

app.controller('InstantSearchController', ['$scope', '$http', function($scope, $http) {
    $http.get('data/index.json').then(function(res) {
        $scope.libraries = toNames(res.data);
    });

    function toNames(d) {
        return d.map(function(v) {
            return {name: v};
        });
    }

    $scope.getLibrary = function($index, library) {
        library.showExtra =! library.showExtra;

        if(library.description) return;

        $http.get('data/' + library.name + '.json').then(function(res) {
            var d = res.data;
            var k;

            for(k in d) {
                library[k] = d[k];
            }
        });
    }
}]);
