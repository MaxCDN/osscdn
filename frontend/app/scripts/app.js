'use strict';

angular.module('osscdnApp', ['ngAnimate', 'ui.router', 'ngDropdowns', 'semverSort',
    'ngClipboard', 'angular-flash.service', 'angular-flash.flash-alert-directive'])
    .config(function($stateProvider, $urlRouterProvider, flashProvider, ngClipProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('libraries', {
            url: '/:name',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        });

        ngClipProvider.setPath('//oss.maxcdn.com/zeroclipboard/1.3.3/ZeroClipboard.swf');

        flashProvider.successClassnames.push('alert-success');
    });
