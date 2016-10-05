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
    controller: function (ordersService){
      this.orders = ordersService.data;

      this.listMode = true;

      this.setListMode = function() {
        this.listMode = true;
      };

      this.setMapMode = function() {
        this.listMode = false;
      };

      //SELECTED LEAD ID - SET/RESET ACTIVE LEAD
      this.activeLead = null;
      this.ResetActiveLead = function() {
        this.isActiveLead = null;
      };
      this.SetActiveLead = function(obj) {
        this.isActiveLead = obj;
      };

      this.leads = new Array();
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
      for (var i=0; i < this.orders.length; i++) {
        this.leads[i] = new Leads(coordinates, this.orders[i]._id, this.orders[i].status, this.orders[i].address, this.orders[i].tradepoint, this.orders[i].client, this.orders[i].date);
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
