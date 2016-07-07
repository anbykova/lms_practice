(function() {
    'use strict';

    angular
        .module('copApp')
        .controller('AppController', AppController);

    AppController.$inject = ['copData', 'dataService','CurrentUserInfo'];
    function AppController(copData, dataService, CurrentUserInfo) {
          dataService.saveCopData(copData);
          dataService.saveCurrentUserInfo(CurrentUserInfo);

          //check token , add currentUser.service, save user.roles
          // bootstrap css js fonts
    }
})();


