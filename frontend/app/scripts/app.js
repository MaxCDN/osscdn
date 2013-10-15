'use strict';

angular.module('osscdnApp', ['ngAnimate', 'ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});