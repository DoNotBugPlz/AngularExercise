/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.reviewed")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("reviewed", {
                url: '/reviewed',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './verification/reviewed/reviewed.html',
                        controller: 'reviewedCtrl',
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
                './verification/reviewed/reviewed.controller.js',
                './verification/reviewed/reviewed.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker',
                'chosen'
            ]);
        }
    }
})();