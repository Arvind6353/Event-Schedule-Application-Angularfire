'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.appointment',
  'firebase',
  'mwl.calendar',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'ngToast'
  
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  
  $routeProvider.otherwise({redirectTo: '/appointment'});
}]);
