import angular from 'angular'
angular.module('rfbgo', [])

.controller('pointsController', function($http){
  //this.points = ["Test1","Test2"];
  $http.get('/tradepoints').then((response) => {
    this.points = response.data;
  })
})
