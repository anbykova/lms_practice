(function() {
         'use strict';

         angular
             .module('copApp')
             .filter('searchFilter', searchFilter);


         function searchFilter() {
             return function(arr, name, city, role, id) {
                 var filtered = [];
                 for (var i = 0; i < arr.length; i++) {
                     var item = arr[i];
                     if (item.ldapName.includes(name) &&
                         item.city.includes(city) &&
                         item.copInfo.some(function(element, index, array) {
                             return element.copId.includes(id) && element.copRoles.some(function(element, index, array) {
                                 return element.includes(role);

                             });
                         })) {
                             filtered.push(item);
                             }
                 }
                 return filtered;
             }
         }
     })();