/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function () {
    angular.module("app.querymonitordatashare")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("querymonitordatashare", {
                url: '/querymonitordatashare',
                params: {Name: '监测数据查询'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorGoods/queryAnalysisDataShare/querymonitordatashare.html',
                        controller: 'QuerymonitordatashareCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadQuerymonitordatashareFiles: loadQuerymonitordatashareFiles
                }
            })
            .state("querymonitordatasharedetail", {
                url: '/querymonitordatasharedetail',
                params: {Name: '监测数据查询修改'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorGoods/queryAnalysisDataShare/detail/querymonitordatashare.detail.html',
                        controller: 'QuerymonitordatashareDetailCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadQuerymonitordatashareDetailFiles: loadQuerymonitordatashareDetailFiles
                }
            });
    }

    /* @ngInject */
    loadQuerymonitordatashareFiles.$inject = ['$ocLazyLoad', 'SYSTEM'];

    /* @ngInject */
    function loadQuerymonitordatashareFiles($ocLazyLoad, SYSTEM) {
        return $ocLazyLoad.load([
            './priceMonitorGoods/queryAnalysisDataShare/querymonitordatashare.controller.js',
            './priceMonitorGoods/queryAnalysisDataShare/querymonitordatashare.service.js',
            SYSTEM.FineBIURL + '?op=emb&resource=finereport.fs.js',
            SYSTEM.FineBIURL + '?op=emb&resource=finereport.js',
            'pagination',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }

    /* @ngInject */
    loadQuerymonitordatashareDetailFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadQuerymonitordatashareDetailFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorGoods/queryAnalysisDataShare/detail/querymonitordatashare.detail.controller.js',
            './priceMonitorGoods/queryAnalysisDataShare/detail/querymonitordatashare.detail.service.js',
            'pagination',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }
})();
