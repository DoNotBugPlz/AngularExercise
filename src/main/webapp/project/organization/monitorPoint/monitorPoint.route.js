(function () {
    angular.module("app.mp")
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("mp", {
                url: '/mp',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './organization/monitorPoint/monitorPoint.html',
                        controller: 'MpCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMpFiles: loadMpFiles
                }
            })

        /* @ngInject */
        loadMpFiles.$inject = ['$ocLazyLoad'];

        /* @ngInject */
        function loadMpFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './organization/monitorPoint/monitorPoint.controller.js',
                './organization/monitorPoint/monitorPoint.service.js',
                'pagination',//分页
                'mCustomScrollbar',//滚动条
                'My97DatePicker',//时间控件
                'ng-zTree'

            ]);
        }
    }


})();