'use strict';

angular.module('osscdnApp').controller('MainCtrl', function ($scope, $http, $window) {
    $http.get('data/index.json').then(function(res) {
        // XXX: mock dropdown data
        $scope.$alert = $window.alert.bind(null);
        $scope.libraries = res.data.map(function(v) {
            v.versions = [
                {
                    "text": "demo",
                    "click": "$alert('demo')"
                },
                {
                    "text": "demo2",
                    "click": "$alert('demo')"
                }
            ];

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
