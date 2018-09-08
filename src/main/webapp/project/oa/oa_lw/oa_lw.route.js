(function () {
    angular.module("app.lw")
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("lw", {
                url: '/lw',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './oa/oa_lw/oa_lw.html',
                        controller: 'LwCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadLwFiles: loadLwFiles
                }
            })

        /* @ngInject */
        loadLwFiles.$inject = ['$ocLazyLoad'];

        /* @ngInject */
        function loadLwFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './oa/oa_lw/oa_lw.controller.js',
                './oa/oa_lw/oa_lw.service.js',
                'pagination',//分页
                'mCustomScrollbar',//滚动条
                'My97DatePicker'//时间控件

            ]);
        }
    }


})();
