(function () {
    angular.module("app.wh")
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("wh", {
                url: '/wh',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './oa/oa_wh/oa_wh.html',
                        controller: 'WhCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadWhFiles: loadWhFiles
                }
            })

        /* @ngInject */
        loadWhFiles.$inject = ['$ocLazyLoad'];

        /* @ngInject */
        function loadWhFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './oa/oa_wh/oa_wh.controller.js',
                './oa/oa_wh/oa_wh.service.js',
                'pagination',//分页
                'mCustomScrollbar',//滚动条
                'My97DatePicker'//时间控件

            ]);
        }
    }


})();
