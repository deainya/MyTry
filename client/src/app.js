import angular from 'angular'
import 'angular-ui-router'
angular.module('rfbgo', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/tradepoints')

  $stateProvider
  .state('tradepoints', {
    url: '/tradepoints',
    templateUrl: 'tradepoints/tradepoints-nav.html',
    resolve: {
      tradepointsService: function($http){
        return $http.get('/tradepoints');
      }
    },
    controller: function (tradepointsService){
      //this.points = ["Test1","Test2"];
      //$http.get('/tradepoints').then((response) => {
        //this.points = response.data;
      //});
      this.points = tradepointsService.data;
    },
    controllerAs: 'pointsCtrl'
  })

  .state('partners', {
    url: '/partners',
    templateUrl: 'tradepoints/table-template.html',
    resolve: {
      partnersService: function($http){
        return $http.get('/partners');
      }
    },
    controller: function (partnersService){
      this.sellers = partnersService.data;
    },
    controllerAs: 'sellersCtrl'
  })

  .state('neworder', {
    url: '/partners/neworder',
    templateUrl: 'tradepoints/new-order.html',
    controller: function($stateParams, $state, $http){
      this.saveOrder = function(order){
        $http({method: 'POST', url: `/partners/neworder`, data: {order}}).then(function(){
          $state.go('orders.order');
        });
      };
    },
    controllerAs: 'newOrderCtrl'
  })


})
