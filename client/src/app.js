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
    controller: function ($scope, partnersService, Partner){
      this.seller = partnersService.data;

      Partner.setSeller(this.seller);
      console.log(Partner.val);
      
      //var _this = this;
      //console.log("val: " + Partner.val);
      //$scope.seller = Partner.getP;
      //console.log("getP: " + Partner.getP);

      /*Partner.getPartner().then(function(response){
        console.log(response.data);
        $scope.seller = response.data;
      })*/
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

/*.service('partnerService', function($http){
  this.partner = $http.get('/partners');
  console.log(this.partner);
})*/

.factory('Partner', function PartnerFactory($http){
  return {
    getPartner: function(){
      return $http.get('/partners');
    },
    setSeller: function(seller){
      this.val = seller;
      console.log(this.val);
    }
    //getP: $http({method: "GET", url: "/partners"}).then(function(response){
      //console.log(response.data);
    //  return response.data;
    //})
  }
})

/*.factory('Partner', function PartnerFactory($http){
  return {
    ppp:{},
    par: function(){
      return $http({method: "GET", url: "/partners"});
    }
  }
    return {
    neworder: function(order){
      $http({method: 'POST', url: `/neworder`, data: {order}}).then(function(){
        $state.go("orders");
      });
      console.log(order||this.seller);
    }
  }
})
})*/
