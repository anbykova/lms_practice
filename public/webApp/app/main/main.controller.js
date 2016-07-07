(function() {
    'use strict';

    angular
        .module('copApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$http'];
    function MainController($http) {
          var vm = this;
          $http.get('/cop').success(function(data) {
            vm.cop = data;
          });
    }
})();