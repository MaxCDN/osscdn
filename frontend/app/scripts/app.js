'use strict';

angular.module('osscdnApp', ['ngAnimate', 'ui.router', 'ngDropdowns', 'semverSort',
    'ngClipboard', 'angular-flash.service', 'angular-flash.flash-alert-directive']).
    value('ZeroClipboardConfig', {
        path: 'bower_components/zeroclipboard/ZeroClipboard.swf'
    }).config(function($stateProvider, $urlRouterProvider, flashProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('libraries', {
            url: '/:name',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        });

        flashProvider.successClassnames.push('alert-success');
    });
