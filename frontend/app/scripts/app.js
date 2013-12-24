'use strict';

angular.module('osscdnApp', ['ngAnimate', 'ui.router', 'ngDropdowns']).
        config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('network', {
        url: '/network',
        templateUrl: 'views/network.html'
    }).state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
    }).state('libraries', {
        url: '/:name',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    });
});
