'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('UserCtrl', function($scope, users) {
    $scope.users = users;
    $scope.addUser = function() {
      users.push({name: $scope.newUser.name });
      $scope.newUser = "";
    }
  })
  .controller('AboutCtrl', function($scope, users) {

  })
  .controller('NavCtrl', function($scope, $location) {
    // this toggles the 'active' class on/off in the navbar
    $scope.isActive = function(path) {
      var current = $location.path();
      return path === current ? 'active' : '';
    };
  });

