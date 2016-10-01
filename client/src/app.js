import angular from 'angular'
import 'angular-ui-router'
angular.module('rfbgo', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/tradepoints')

  $stateProvider
  .state('tradepoints', {
    url:'/tradepoints',
    templateUrl:'tradepoints/tradepoints-nav.html',
    controller: function ($http){
      //this.points = ["Test1","Test2"];
      $http.get('/tradepoints').then((response) => {
        this.points = response.data;
      });
    },
    controllerAs: 'pointsCtrl'
  })
})
