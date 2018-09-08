(function () {
    angular.module("app.wqt")
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("wqt", {
                url: '/wqt',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './oa/oawqt/oa_wqt.html',
                        controller: 'WqtlCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadWqtFiles: loadWqtFiles
                }
            })

        /* @ngInject */
        loadWqtFiles.$inject = ['$ocLazyLoad'];

        /* @ngInject */
        function loadWqtFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './oa/oawqt/oa_wqt.controller.js',
                './oa/oawqt/oa_wqt.service.js',
                'pagination',//分页
                'mCustomScrollbar',//滚动条
                'My97DatePicker'//时间控件

            ]);
        }
    }


})();
