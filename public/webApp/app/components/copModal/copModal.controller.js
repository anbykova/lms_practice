(function () {
    'use strict';

    angular
        .module('copApp')
        .controller('CopModalController', CopModalController);

    CopModalController.$inject = ['$scope', '$state', 'apiService', 'dataService'];
    function CopModalController($scope, $state, apiService, dataService) {

        activate();

        function activate(){
           $scope.data = {link : "", title : "", description : ""};
           $scope.goToEvent = goToEvent;
           $scope.update = update;
           $scope.closeModal = closeModal;

           if ($scope.modalOptions.isCreating) {
            $scope.event = "Create";
           } else {
             console.log($scope.data);

             $scope.data = angular.copy($scope.modalOptions.cop);
             $scope.event = "Update";
           }
        }

        function goToEvent() {
            var cop = {
              title : $scope.data.title,
              link : $scope.data.link,
              description : $scope.data.description
            }
            if (!$scope.modalOptions.isCreating) {cop.id = $scope.modalOptions.cop.id;}
            update(cop);

        }
        function closeModal(result){
              $scope.$close();
        };


       function update(cop) {
           var reader = new FileReader(),
               $img = $("#img")[0];

           if ($img.files.length)  {
               reader.onload = function (e) {
                   if (!e.target.result) return;
                   $scope.image = e.target.result;
                   var index = $scope.image.indexOf("base64");
                   var imageData =  $scope.image.substring(index+6);
                   $scope.data.imageData = imageData;
                   if ($scope.data.imageData) {cop.imageData = $scope.data.imageData;}
                   $scope.modalOptions.callback(cop);

           }
               reader.readAsDataURL($img.files[0]);
           } else {
               $scope.modalOptions.callback(cop);
           }
       };

    }

})();