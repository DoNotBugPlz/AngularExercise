/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.sensitive")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("sensitive", {
                url: '/sensitive',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './sms/sensitivewords/sensitivewords.html',
                        controller: 'sensitiveCtrl',
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
                './sms/sensitivewords/sensitivewords.controller.js',
                './sms/sensitivewords/sensitivewords.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker',
                'chosen',


            ]);
        }
    }
})();