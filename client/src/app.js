import angular from 'angular'
import 'angular-ui-router'
angular.module('rfbgo', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/partners')

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
    controller: function (partnersService, Partner, Gravatar){
      this.seller = partnersService.data;
      Partner.setSeller(this.seller);
      this.gravatarUrl = Gravatar.generate(this.seller.email);
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
    controller: function (consultantService, Gravatar){
      this.consultant = consultantService.data;
      this.gravatarUrl = Gravatar.generate(this.consultant.email);
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
    controller: function (ordersService, $stateParams, $state, $http){
      this.orders = ordersService.data;
      this.Cancel = function(orderid){
        console.log(orderid);
        $http({method: 'POST', url: `/cancelorder`, data: {orderid}}).then(function(){
          $state.go("orders");
        });
      };
      this.isCancel = function(status){
        return status !== "Отменён";
      };

    },
    controllerAs: 'ordersCtrl'
  })

  .state('neworder', {
    url: '/neworder',
    templateUrl: 'templates/new-order.html',
    controller: function($stateParams, $state, $http, Partner){

      console.log("Seller");
      console.log(Partner.Seller);

      this.addOrder = function(order){
          //$http.post('/neworder', {order});
          angular.extend(order, {partner:Partner.Seller}, {"status":"Новый"});

          $http({method: 'POST', url: `/neworder`, data: {order}}).then(function(){
            $state.go("orders");
        });
      };
    },
    controllerAs: 'newOrderCtrl'
  })

})

.factory('Partner', function PartnerFactory($http){
  return {
    getPartner: function(){
      return $http.get('/partners');
    },
    setSeller: function(seller){
      console.log("set");
      this.Seller = seller;
      console.log(this.Seller);
    },
    getSeller: function(){
      console.log("get");
      console.log(this.Seller);
      return this.Seller;
    }
  }
})

.factory('Gravatar', function GravatarFactory(){
  var avatarSize = 80;
  var avatarUrl = "http://www.gravatar.com/avatar/";
  return {
    generate: function(email){
      console.log(CryptoJS.MD5(email));
      return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
    }
  };
})
