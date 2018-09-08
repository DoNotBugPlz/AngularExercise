/**
 * @author maxzhao
 * @time 2018/08/23.
 */
(function () {
    angular.module("app.querymonitordata")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("querymonitordata", {
                url: '/querymonitordata',
                params: {Name: '监测数据查询'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorGoods/queryAnalysisData/querymonitordata.html',
                        controller: 'QuerymonitordataCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadQuerymonitordataFiles: loadQuerymonitordataFiles
                }
            })
            .state("querymonitordatadetail", {
                url: '/querymonitordatadetail',
                params: {Name: '监测数据查询修改'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorGoods/queryAnalysisData/detail/querymonitordata.detail.html',
                        controller: 'QuerymonitordataDetailCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadQuerymonitordataDetailFiles: loadQuerymonitordataDetailFiles
                }
            });
    }

    /* @ngInject */
    loadQuerymonitordataFiles.$inject = ['$ocLazyLoad', 'SYSTEM'];

    /* @ngInject */
    function loadQuerymonitordataFiles($ocLazyLoad, SYSTEM) {
        return $ocLazyLoad.load([
            './priceMonitorGoods/queryAnalysisData/querymonitordata.controller.js',
            './priceMonitorGoods/queryAnalysisData/querymonitordata.service.js',
            SYSTEM.FineBIURL + '?op=emb&resource=finereport.fs.js',
            SYSTEM.FineBIURL + '?op=emb&resource=finereport.js',
            'pagination',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }

    /* @ngInject */
    loadQuerymonitordataDetailFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadQuerymonitordataDetailFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorGoods/queryAnalysisData/detail/querymonitordata.detail.controller.js',
            './priceMonitorGoods/queryAnalysisData/detail/querymonitordata.detail.service.js',
            'pagination',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }
})();
