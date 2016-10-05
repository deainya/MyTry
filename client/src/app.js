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

  .state('orders', {
    url: '/orders',
    templateUrl: 'templates/agent.html',
    resolve: {
      ordersService: function($http){
        return $http.get('/orders');
      }
    },
    controller: function (ordersService, $scope){
      $scope.orders = ordersService.data;

      $scope.listMode = true;

      $scope.setListMode = function() {
        $scope.listMode = true;
      };

      $scope.setMapMode = function() {
        $scope.listMode = false;
      };

      //SELECTED LEAD ID - SET/RESET ACTIVE LEAD
      $scope.activeLead = null;
      $scope.ResetActiveLead = function() {
        $scope.isActiveLead = null;
      };
      $scope.SetActiveLead = function(obj) {
        $scope.isActiveLead = obj;
      };

      $scope.leads = new Array();
      var Leads = function(position, number, state, address, tradepoint, customer, date) {
        var lead = {};
        lead._position=position;
        lead._number=number;
        lead._state=state;
        lead._address=address;
        lead._tradepoint=tradepoint;
        lead._customer=customer;
        lead._date=date;
        lead._isActive = false;
        lead.setActive = function() {
          switch (lead._isActive) {
            case true:
              lead._isActive=false;
              break;
            case false:
              lead._isActive=true;
              break;
          }
        };
        lead.takeLead = function() {
          console.log("hey server gimme the lead " + lead._number);
        };
        return (lead);
      };

      var coordinates = [53.2000600, 50.1500000];
      for (var i=0; i < $scope.orders.length; i++) {
        this.leads[i] = new Leads(coordinates, $scope.orders[i]._id, $scope.orders[i].status, $scope.orders[i].contact.email, $scope.orders[i].tradepoint, $scope.orders[i].client, $scope.orders[i].date);
      };

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
