'use strict';

angular.module('osscdnApp', ['ngAnimate', 'ui.router', 'ngDropdowns']).
        config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('libraries', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).state('network', {
        url: '/network',
        templateUrl: 'views/network.html'
    }).state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
    });
});
