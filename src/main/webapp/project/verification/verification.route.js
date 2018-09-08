/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.verification")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("verification", {
                url: '/verification',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './verification/verification.html',
                        controller: 'verificationCtrl',
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
                './verification/verification.controller.js',
                './verification/verification.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker',
                'chosen'
            ]);
        }
    }
})();