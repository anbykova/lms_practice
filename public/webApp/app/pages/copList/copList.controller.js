(function () {
    'use strict';

    angular
        .module('copApp')
        .controller('CopListController', CopListController);

    CopListController.$inject = ['$scope','$uibModal','dataService', 'apiService'];

    function CopListController($scope, $uibModal,dataService, apiService) {
        var vm = this;
        vm.copData = dataService.getCopData();
        vm.CurrentUserInfo = dataService.getCurrentUserInfo();

        vm.getAllCop = getAllCop;
        vm.isAdmin = isAdmin;
        vm.getMyCop = getMyCop;
        vm.deleteCop = deleteCop;
        vm.editCop = editCop;
        vm.createCop = createCop;

        vm.cops = vm.copData;

        function isAdmin() {
            return true;
        }

        function getMyCop() {
            var result = [];
            vm.CurrentUserInfo.copInfo.forEach(function (item) {
                vm.copData.forEach(function (itemData) {
                    if (itemData.id === item.copId) result.push(itemData);
                });
            });
            vm.copData = result;

        }

        function getAllCop() {
            vm.copData = vm.cops;
        }

        function deleteCop(id) {
            var isDelete = confirm("Вы уверены, что хотите удалить?");
            if (isDelete) {
                apiService.deleteCop(id).then(function (updatedCop){
                     for (var i = 0; i < vm.copData.length; i++) {
                          if (vm.copData[i].id == id)
                              {
                                  vm.copData.splice(i,1);
                                  break;
                              }
                     }
                 });
            }
        }


        function createData(cop){

                 console.log("create");
                 apiService.createCop(cop).then(function (createdCop){
                     vm.copData.push(createdCop);
                 });
        }


        function updateData(cop){

                 console.log("update");
                 apiService.updateCop(cop.id, cop).then(function (updatedCop){
                      for (var i = 0; i < vm.copData.length; i++) {
                           if (vm.copData[i].id == cop.id)
                             {
                                 vm.copData[i] = updatedCop;
                                 break;
                             }

                      }
                 });

/*                 apiService.getAllCop()
                     .then(function (data) {

                         dataService.saveCopData(data);
                         vm.copData = dataService.getCopData();
                     });*/
        }
        function createCop () {
            open({
                isCreating: true,
                callback: createData
            })
        }
        function editCop(cop) {
            open({
                isCreating: false,
                cop: cop,
                callback: updateData
            });
        }

        function open(options) {
            $scope.modalOptions = options;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/copModal/copModal.html',
                controller: 'CopModalController',
                scope: $scope
            })

        }
    }



})();