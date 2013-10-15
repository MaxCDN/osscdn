'use strict';

angular.module('osscdnApp').controller('MainCtrl', function ($scope, $http) {
    $http.get('data/index.json').then(function(res) {
        $scope.libraries = res.data;
    });

    $scope.getLibrary = function($index, library) {
        library.showExtra =! library.showExtra;

        if(library.description || !library.showExtra) return;

        $http.get('data/' + library.name + '.json').then(function(res) {
            var d = res.data;
            var k;

            for(k in d) {
                library[k] = d[k];
            }
        });
    }
});