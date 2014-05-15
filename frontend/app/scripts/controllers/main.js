'use strict';

angular.module('osscdnApp').controller('MainCtrl', function($scope, $http, $state, $filter, flash) {
    $scope.search = {};
    $scope.libraries = [];
    $scope.limit = 10;

    var root = 'http://api.jsdelivr.com/v1/jsdelivr/libraries';

    $http.get(root + '?fields=name').then(function(res) {
        // attach random keys needed by random sorting
        $scope.libraries = res.data.map(function(lib) {
            lib.randomKey = parseInt(Math.random() * 1000, 10);

            return lib;
        });

        if($state.params.name) {
            $scope.search.name = $state.params.name;
            $scope.limit = 1;
        }
    });

    $scope.orderByName = function(library) {
        if($scope.search && $scope.search.name) {
            return library.name.length;
        }

        // use random order in case no search query exists
        return library.randomKey;
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

    $scope.getCDNLink = function(name, version, file) {
        return '//oss.maxcdn.com/' + name + '/' + version + '/' + file;
    };

    $scope.copied = function() {
        flash.success = 'Copied to clipboard';
    };

    function getLibrary(library) {
        if(library.description) {
            return;
        }

        $http.get(root + '/' + library.name +
                '?fields=author,name,description,homepage,assets').then(function(res) {
            var d = res.data[0];
            var k;

            for(k in d) {
                library[k] = d[k];
            }

            // XXX: convert assets to cdn format
            library.cdn = convertAssets(library.assets);
            delete library.assets;

            library.versions = $filter('semverSort')(Object.keys(library.cdn)).map(function(version) {
                return {
                    text: semverize(version),
                    value: version
                };
            }).reverse();

            library.selectedVersion = library.versions[0];
        });
    }

    function convertAssets(arr) {
        var ret = {};

        if(!arr) {
            return ret;
        }

        arr.forEach(function(v) {
            ret[v.version] = v.files;
        });

        return ret;
    }

    function semverize(str) {
        // x.y -> x.y.0
        var parts = str.split('.');

        if(parts && parts.length === 2) {
            return str + '.0';
        }

        return str;
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
