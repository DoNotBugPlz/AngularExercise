/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function () {
    angular.module("app.querymonitordatalower")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("querymonitordatalower", {
                url: '/querymonitordatalower',
                params: {Name: '监测数据查询'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorGoods/queryAnalysisDataLower/querymonitordatalower.html',
                        controller: 'QuerymonitordatalowerCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadQuerymonitordatalowerFiles: loadQuerymonitordatalowerFiles
                }
            })
            .state("querymonitordatalowerdetail", {
                url: '/querymonitordatalowerdetail',
                params: {Name: '监测数据查询修改'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorGoods/queryAnalysisDataLower/detail/querymonitordatalower.detail.html',
                        controller: 'QuerymonitordatalowerDetailCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadQuerymonitordatalowerDetailFiles: loadQuerymonitordatalowerDetailFiles
                }
            });
    }

    /* @ngInject */
    loadQuerymonitordatalowerFiles.$inject = ['$ocLazyLoad', 'SYSTEM'];

    /* @ngInject */
    function loadQuerymonitordatalowerFiles($ocLazyLoad, SYSTEM) {
        return $ocLazyLoad.load([
            './priceMonitorGoods/queryAnalysisDataLower/querymonitordatalower.controller.js',
            './priceMonitorGoods/queryAnalysisDataLower/querymonitordatalower.service.js',
            SYSTEM.FineBIURL + '?op=emb&resource=finereport.fs.js',
            SYSTEM.FineBIURL + '?op=emb&resource=finereport.js',
            'pagination',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }

    /* @ngInject */
    loadQuerymonitordatalowerDetailFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadQuerymonitordatalowerDetailFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorGoods/queryAnalysisDataLower/detail/querymonitordatalower.detail.controller.js',
            './priceMonitorGoods/queryAnalysisDataLower/detail/querymonitordatalower.detail.service.js',
            'pagination',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }
})();
