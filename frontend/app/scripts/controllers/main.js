'use strict';

angular.module('osscdnApp').controller('MainCtrl', function ($scope, $http) {
    $http.get('data/index.json').then(function(res) {
        // XXX: mock dropdown data
        $scope.libraries = res.data.map(function(v) {
            v.versions = [
                {
                    text: 'demo',
                    value: 'one'
                },
                {
                    text: 'demo2',
                    value: 'two'
                }
            ];
            v.selectedVersion = {
                text: 'select a version'
            };

            return v;
        });
    });

    $scope.orderByName = function(library) {
        if($scope.search && $scope.search.name) {
            return library.name.length;
        }

        return library.name;
    };

    $scope.getLibrary = function($index, library) {
        library.showExtra =! library.showExtra;

        if(library.description || !library.showExtra) {
            return;
        }

        $http.get('data/' + library.name + '.json').then(function(res) {
            var d = res.data;
            var k;

            for(k in d) {
                library[k] = d[k];
            }
        });
    };
});
