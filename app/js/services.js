'use strict';

/* Services */

angular.module('myApp.services', ['ngResource'])
  .factory("User", function($resource) {
    return $resource('/users/:userId', {userId: '@id'})
  });
