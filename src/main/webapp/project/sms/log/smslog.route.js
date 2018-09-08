/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.smslog")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("smslog", {
                url: '/smslog',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './sms/log/smslog.html',
                        controller: 'SmslogCtrl',
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
            './sms/log/smslog.controller.js',
            './sms/log/smslog.service.js',
            'pagination',
            'mCustomScrollbar'
        ]);
    }
})();