(function() {
    'use strict';

    angular
        .module('copApp')
        .config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function routerConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/app/cop-list');
        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: './app/app.view.html',
                abstract : true,
                controller: 'AppController',
                controllerAs: 'vm',
                resolve: {
                    copData: function(apiService) {
                        return apiService.getAllCop();
                    },
                    CurrentUserInfo: function(apiService) {
                        return apiService.getCurrentUserInfo();
                    }
                }
            })
            .state('app.copList', {
                url: '/cop-list',
                templateUrl: 'app/pages/copList/copList.html',
                controller: 'CopListController',
                controllerAs: 'vm'
            })
            .state('app.search', {
                url: '/search',
                templateUrl: 'app/pages/employeesSearch/employeesSearch.html',
                controller: 'EmployeesSearchController',
                controllerAs: 'vm',
                resolve: {
                    employeesData: function(apiService) {
                        return apiService.getAllEmployees();
                    }
                }
            })



    }

})();