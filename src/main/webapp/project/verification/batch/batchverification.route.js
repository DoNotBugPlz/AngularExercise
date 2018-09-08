/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.batch")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("batch", {
                url: '/batch',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './verification/batch/batchverifiaction.html',
                        controller: 'batchCtrl',
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
                './verification/batch/batchverification.controller.js',
                './verification/batch/batchverification.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker',
                'chosen'
            ]);
        }
    }
})();