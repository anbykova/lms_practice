(function() {
    'use strict';

    angular
        .module('copApp')
        .service('apiService', apiService);

    apiService.$inject = ['$http'];
    function apiService($http) {
          var headers =  {
               Authorization : "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJST0xFUyI6WyJBRE1JTiJdLCJMREFQX05BTUUi"+
                                "OiJhem90b3YiLCJpYXQiOjE0Njk2OTU2NTh9.j0vkkTiIaezkYapeO_8APQTArlzTmc_Bp0jLfc1qPGI"
          }

          return {
                getAllCop: getAllCop,
                getCurrentUserInfo: getCurrentUserInfo,
                deleteCop: deleteCop,
                getAllEmployees : getAllEmployees,
                updateCop : updateCop,
                createCop : createCop
          }

          function getAllCop() {

              return sendRequest({url : "/cop"});
          }
          function getAllEmployees() {

              return sendRequest({url : "/cop/admin/employees/"});
          }
          function deleteCop(id) {

              return sendRequest({url : "/cop/admin/" + id, method : "delete"});
          }
          function getCurrentUserInfo() {
              return sendRequest({url : "/cop/employees/current"});
          }
          function  updateCop(id, data){
                return sendRequest({url : "/cop/admin/" + id, method : "put", data : data});
          }

          function  createCop(data){
                return sendRequest({url : "/cop/admin/", method : "post", data : data});
          }

          function sendRequest(options){

             return $http({
                    method: options.method || 'get',
                    url : options.url,
                    headers : headers,
                    data : options.data
                  })
                  .then(function(result) {

                      return result.data;
                  });
             }
    }
})();
