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
        this.test = "xxx"
        return $http.get('/partners');
      }
    },
    controller: ['Partner', function (Partner){
      this.seller = Partner.all().data;
      console.log(Partner.sell);
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
      this.consultant = consultantService.data;
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
    controller: function($stateParams, $state, $http){
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

.factory('Partner', ['$http', function PartnerFactory($http){
  return {
    all: function(){
      this.sell = "xxx";
      return $http.get('/partners');
    }/*,
    neworder: function(order){
      $http({method: 'POST', url: `/neworder`, data: {order}}).then(function(){
        $state.go("orders");
      });
      console.log(order||this.seller);
    }*/
  }
}])
