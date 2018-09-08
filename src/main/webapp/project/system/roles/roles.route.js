/**
 * Created by tr on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.roles")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("roles", {
                url: '/roles',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './system/roles/roles.html',
                        controller: 'RolesCtrl',
                        controllerAs: 'roles'
                    }
                },
                resolve: {
                    loadRolesFiles: loadRolesFiles
                }
            })

        loadRolesFiles.$inject = ['$ocLazyLoad'];
        function loadRolesFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './system/roles/roles.controller.js',
                './system/roles/roles.service.js',
                'mCustomScrollbar',
                'ng-zTree'
            ]);
        }
    }
})();