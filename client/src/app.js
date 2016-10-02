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
    controller: function (partnersService){
      this.seller = partnersService.data;
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

  .state('partners.neworder', {
    url: '/neworder',
    templateUrl: 'templates/new-order.html',
    controller: function($stateParams, $state, $http){
      this.saveOrder = function(order){
          $http.post('/neworder', {order});
        };
      };
    },
    controllerAs: 'newOrderCtrl'
  })

})
