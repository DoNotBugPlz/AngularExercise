(function () {
    angular.module("app.fau")
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("fau", {
                url: '/fau',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './flow/flow_activity_user/flow_activity_user.html',
                        controller: 'FauCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadFauFiles: loadFauFiles
                }
            })

        /* @ngInject */
        loadFauFiles.$inject = ['$ocLazyLoad'];

        /* @ngInject */
        function loadFauFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './flow/flow_activity_user/flow_activity_user.controller.js',
                './flow/flow_activity_user/flow_activity_user.service.js',
                'pagination',//分页
                'mCustomScrollbar',//滚动条
                'My97DatePicker'//时间控件

            ]);
        }
    }


})();
