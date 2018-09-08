/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.auditor")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("auditor", {
                url: '/auditor',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './matter/auditor/auditor.html',
                        controller: 'auditorCtrl',
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
                './matter/auditor/auditor.controller.js',
                './matter/auditor/auditor.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker'

            ]);
        }
    }
})();