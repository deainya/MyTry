import angular from 'angular'
angular.module('rfbgo', [])

.controller('tpointsController', function($http){
  //this.tpoints = ["Test1","Test2"];
  $http.get('/tpoints').then((response) => {
    this.tpoints = response.data;
  })
})
