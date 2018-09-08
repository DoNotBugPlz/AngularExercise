/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.smsmonitor")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("smsmonitor", {
                url: '/smsmonitor',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './sms/servermonitor/smsmonitor.html',
                        controller: 'SmsMonitorCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadRolesFiles: loadRolesFiles
                }
            });
    }
    loadRolesFiles.$inject = ['$ocLazyLoad'];
    function loadRolesFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './sms/servermonitor/smsmonitor.controller.js',
            './sms/servermonitor/smsmonitor.service.js',
            'pagination',
            'mCustomScrollbar',
            'chosen',

        ]);
    }
})();