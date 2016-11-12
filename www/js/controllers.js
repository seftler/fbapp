angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, ngFB, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          $state.go('app.home');
        } else {
          alert('Facebook login failed');
        }
      }
    );
  };
})

.controller('HomeCtrl', function ($scope, ngFB) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        }
      );

      $scope.share = function (event) {
        ngFB.api({
          method: 'POST',
          path: '/me/feed',
          params: {
              message: "I'll be attending: Seminar by Shukarullah Shah on Ionic Facebook Integration "
          }
      }).then(
          function () {
              alert('The session was shared on Facebook');
          },
          function () {
              alert('An error occurred while sharing this session on Facebook');
          });
      };
});
