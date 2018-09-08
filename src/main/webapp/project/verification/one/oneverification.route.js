/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.oneverification")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("oneverification", {
                url: '/oneverification',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './verification/one/oneverification.html',
                        controller: 'oneverificationCtrl',
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
                './verification/one/oneverification.controller.js',
                './verification/one/oneverification.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker',
                'chosen'
            ]);
        }
    }
})();