'use strict';

angular.module('osscdnApp').controller('MainCtrl', function ($scope, $http, $state) {
    $scope.search = {
        name: $state.params.name
    };
    $scope.libraries = [];

    $http.get('data/index.json').then(function(res) {
        $scope.libraries = res.data;
    });

    $scope.orderByName = function(library) {
        if($scope.search && $scope.search.name) {
            return library.name.length;
        }

        return library.name;
    };

    $scope.getLibraries = function() {
        $scope.libraries.filtered.forEach(getLibrary);
    };

    function getLibrary(library) {
        if(library.description) {
            return;
        }

        $http.get('data/' + library.name + '.json').then(function(res) {
            var d = res.data;
            var k;

            for(k in d) {
                library[k] = d[k];
            }

            library.versions = Object.keys(library.cdn).map(function(version) {
                return {
                    text: version,
                    value: version
                };
            }).reverse();

            library.selectedVersion = library.versions[0];
        });
    }
});

angular.module('osscdnApp').filter('as', function($parse) {
    return function(value, path) {
        return $parse(path).assign(this, value);
    };
});

angular.module('osscdnApp').directive('repeatDone', function() {
    return {
        restrict: 'A',
        scope: {
            method: '&repeatDone'
        },
        link: function($scope) {
            if($scope.$parent.$last) {
                $scope.method()();
            }
        }
    };
});
