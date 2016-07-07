(function() {
    'use strict';

    angular
        .module('copApp')
        .controller('EmployeesSearchController', EmployeesSearchController);

    EmployeesSearchController.$inject = ['dataService', 'employeesData'];
    function EmployeesSearchController(dataService, employeesData) {
        var vm = this;
        activate();
        function activate() {
             dataService.saveEmployeesData(employeesData);
             vm.employeesData = dataService.getEmployeesData();
             vm.copData = dataService.getCopData();
             vm.filterCity = '';
             vm.filterRole = '';
             vm.filterCopId = '';
             vm.filterLdapName = '';
             vm.copCities = [];
             vm.copRoles = [];
             vm.copNames = {};
             vm.copIds = [];
             function UpperFirst(input) {
               return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
             }

            for (var i = 0; i < vm.employeesData.length; i++) {
                vm.employeesData[i].city = UpperFirst(vm.employeesData[i].city)
                vm.copCities.push(vm.employeesData[i].city);

                for (var j = 0; j < vm.employeesData[i].copInfo.length; j++) {
                    var copId = vm.employeesData[i].copInfo[j].copId;
                    var a = vm.copData[getIndexById(copId)];
                    if (a) {
                     vm.copIds.push(copId);
                    }

                    for (var k = 0; k < vm.employeesData[i].copInfo[j].copRoles.length; k++) {
                    vm.copRoles.push(vm.employeesData[i].copInfo[j].copRoles[k]);

                    }
                }
            }

            vm.copCities = vm.copCities.filter(onlyUnique);
            vm.copRoles = vm.copRoles.filter(onlyUnique);
            vm.copIds = vm.copIds.filter(onlyUnique);
            vm.cop = [];

            for (var i = 0; i < vm.copIds.length; i++) {
                var a = vm.copData[getIndexById(vm.copIds[i])];
                vm.copNames[vm.copIds[i]] = a.title;
            }
            console.log(vm.copNames);



            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            function getIndexById(id) {
                for (var i = 0; i < vm.copData.length; i++) {
                    if (vm.copData[i].id === id) {
                        return i;
                    }
                }
            }

        }
    }



})();


