(function () {
    angular.module("app.fw")
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("fw", {
                url: '/fw',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './oa/oa_fw/oa_fw.html',
                        controller: 'FwCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadFwFiles: loadFwFiles
                }
            })

        /* @ngInject */
        loadFwFiles.$inject = ['$ocLazyLoad'];

        /* @ngInject */
        function loadFwFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './oa/oa_fw/oa_fw.controller.js',
                './oa/oa_fw/oa_fw.service.js',
                'pagination',//分页
                'mCustomScrollbar',//滚动条
                'My97DatePicker'//时间控件

            ]);
        }
    }


})();
