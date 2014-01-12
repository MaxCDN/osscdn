'use strict';

angular.module('osscdnApp').controller('MainCtrl', function ($scope, $http, $state, flash) {
    $scope.search = {};
    $scope.libraries = [];
    $scope.limit = 10;
    $scope.demo = [1, 2, 3];

    $http.get('data/index.json').then(function(res) {
        $scope.libraries = res.data;

        if($state.params.name) {
            $scope.search.name = $state.params.name;
            $scope.limit = 1;
        }
    });

    $scope.orderByName = function(library) {
        if($scope.search && $scope.search.name) {
            return library.name.length;
        }

        return library.name;
    };

    $scope.getLibraries = function() {
        if($scope.libraries.filtered) {
            $scope.libraries.filtered.forEach(getLibrary);
        }
        else {
            console.warn('Missing library data!');
        }
    };

    $scope.hasEnoughItems = function(library) {
        if(!library.selectedVersion) {
            return;
        }

        // it would be better to calculate visibility status via CSS
        var version = library.selectedVersion.value;

        return library.cdn[version].length > 6;
    };

    $scope.copy = function(demo, item, index) {
        console.log(demo, item, index);
    };

    $scope.getCopyLink = function(library, version, file) {
console.log(library, version, file);

        return '//oss.maxcdn.com/libs/' + library + '/' + version + '/' + file;
    };

    $scope.copied = function() {
        flash.success = 'Copied to clipboard';
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
