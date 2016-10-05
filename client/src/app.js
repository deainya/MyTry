import angular from 'angular'
import 'angular-ui-router'
angular.module('rfbgo', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('tradepoints', {
    url: '/tradepoints',
    templateUrl: 'templates/tradepoints.html',
    resolve: {
      tradepointsService: function($http){
        return $http.get('/tradepoints');
      }
    },
    controller: function (tradepointsService){
      this.points = tradepointsService.data;
    },
    controllerAs: 'pointsCtrl'
  })

  .state('partners', {
    url: '/partners',
    templateUrl: 'templates/partner.html',
    resolve: {
      partnersService: function($http){
        return $http.get('/partners');
      }
    },
    controller: function ($rootScope, $scope, partnersService){
      this.seller = partnersService.data;
      $scope.partnerService = this.seller
    },
    controllerAs: 'sellerCtrl'
  })

  .state('consultant', {
    url: '/consultant',
    templateUrl: 'templates/consultant.html',
    resolve: {
      consultantService: function($http){
        return $http.get('/consultant');
      }
    },
    controller: function (consultantService){
      this.consultant = consultantService.partner;
    },
    controllerAs: 'consultantCtrl'
  })

  .state('orders', {
    url: '/orders',
    templateUrl: 'templates/orders.html',
    resolve: {
      ordersService: function($http){
        return $http.get('/orders');
      }
    },
    controller: function (ordersService){
      this.orders = ordersService.data;
    },
    controllerAs: 'ordersCtrl'
  })

  .state('neworder', {
    url: '/neworder',
    templateUrl: 'templates/new-order.html',
    controller: function($stateParams, $state, $http, $rootScope, $scope, partnerService){
      this.addOrder = function(order){
          //$http.post('/neworder', {order});
          $http({method: 'POST', url: `/neworder`, data: {order}}).then(function(){
            $state.go("orders");
        });
      };
    },
    controllerAs: 'newOrderCtrl'
  })

})

.service('partnerService', function(){

})
