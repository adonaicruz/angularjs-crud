angular.module('app.services', [])
.factory('ClientsFactory', function($http,$rootScope,LS) {
  var clients = [];
  return {
    getAll: function() {
        var clients = LS.getData('clients');
        this.clients = (clients) ? clients : [];
        return this.clients;
    },
    save(client,index){
        var me = this;
        if(index !== null){
            this.clients[index] = client;
        }else{
            client.id = new Date().getTime();
            this.clients.push(client);
        }
        LS.setData('clients',this.clients);
    },
     delete: function(index) {
        this.clients.splice(index,1);
        LS.setData('clients',this.clients);
    },
    getModels: function(brandCode){
        return $http.get("https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas/"+brandCode+"/modelos",{}).then(function(response){
            return response.data.modelos;
        },handlerError);
    },
    getBrands(){
        return $http.get("https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas",{}).then(function(response){
            return response.data;
        },handlerError);
    }
  }
  function handlerError(response){
    alert('ocorreu um erro buscar os veículos');
  }
})
.factory("LS", function($window, $rootScope) {
  return {
    setData: function(key,val) {
      val = JSON.stringify(val);
      $window.localStorage && $window.localStorage.setItem(key, val);
      return this;
    },
    getData: function(key) {
      return JSON.parse($window.localStorage && $window.localStorage.getItem(key));
    }
  };
});