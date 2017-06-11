'use strict';

angular.module('app.clients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clients', {
    templateUrl: 'clients/clients.html',
    controller: 'ClientsCtrl'
  });
}])

.controller('ClientsCtrl', function($scope, ClientsFactory) {

  $scope.client = {};

  $scope.clients = ClientsFactory.getAll();
  
  var editIndex = null;

  ClientsFactory.getBrands().then(function(brands){
    $scope.brands = brands;
  });
  $scope.updateModels = function(vehicleBrand){
    ClientsFactory.getModels(vehicleBrand).then(function(models){
      $scope.models = models;
    });
  }
  $scope.submitForm = function(isValid,error){
    if (isValid){
      ClientsFactory.save($scope.client,editIndex);
      $scope.clients = ClientsFactory.getAll();
      $scope.reset();
    }
  }

  $scope.reset = function(){
    $scope.client = {};
    editIndex = null;
  }

  $scope.edit = function(client,index){
    $scope.updateModels(client.vehicleBrand);
    $scope.client = client;
    editIndex = index;
  }
  $scope.delete = function(index){
    ClientsFactory.delete(index);
    $scope.clients = ClientsFactory.getAll();
  }

  
});