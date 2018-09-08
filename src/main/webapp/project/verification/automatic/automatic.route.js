/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.automatic")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("automatic", {
                url: '/automatic',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './verification/automatic/automatic.html',
                        controller: 'automaticCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadRolesFiles: loadRolesFiles
                }
            })

        loadRolesFiles.$inject = ['$ocLazyLoad'];
        function loadRolesFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './verification/automatic/automatic.controller.js',
                './verification/automatic/automatic.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker',
                'chosen'
            ]);
        }
    }
})();