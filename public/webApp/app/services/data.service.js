(function() {
    'use strict';

    angular
        .module('copApp')
        .factory('dataService', dataService);

    dataService.$inject = [];
    function dataService() {

          var data = {copData: [], currentUserInfo: [], employeesData : []};

          return {
             saveCopData : saveCopData,
             getCopData : getCopData,
             saveCurrentUserInfo : saveCurrentUserInfo,
             getCurrentUserInfo : getCurrentUserInfo,
             saveEmployeesData : saveEmployeesData,
             getEmployeesData : getEmployeesData

          }
          function saveCopData(copData) {

            data.copData = copData;
          }
          function getCopData() {
             return data.copData;
          }

         function saveCurrentUserInfo(currentUserInfo) {

           data.currentUserInfo = currentUserInfo;
         }
         function getCurrentUserInfo() {
             return data.currentUserInfo;
         }
         function saveEmployeesData(employeesData) {
               data.employeesData = employeesData;
         }
         function getEmployeesData() {
           return data.employeesData;
         }
    }
})();