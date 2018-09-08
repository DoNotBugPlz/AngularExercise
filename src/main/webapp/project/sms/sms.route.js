/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.sms")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("sms", {
                url: '/sms',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './sms/sms.html',
                        controller: 'SmsCtrl',
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
                './sms/sms.controller.js',
                './sms/sms.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker',
                'chosen'
            ]);
        }
    }
})();