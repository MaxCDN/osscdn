'use strict';

angular.module('osscdnApp', ['ngAnimate', 'ui.router', 'ngDropdowns']).
        config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('libraries', {
        url: '/:name',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    });
});

