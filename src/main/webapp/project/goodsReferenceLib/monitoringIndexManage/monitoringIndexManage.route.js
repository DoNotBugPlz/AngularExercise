(function () {
    angular.module("app.monitoringIndexManage")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("monitoringIndexManage", {
                url: '/monitoringIndexManage',
                params: {menuName: '监测指标'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl:'./goodsReferenceLib/monitoringIndexManage/monitoringIndexManage.html',
                        controller: 'MonitoringIndexManageCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitoringIndexManageFiles: loadMonitoringIndexManageFiles
                }
            })
    }

    /* @ngInject */
    loadMonitoringIndexManageFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMonitoringIndexManageFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './goodsReferenceLib/monitoringIndexManage/monitoringIndexManage.controller.js',
            './goodsReferenceLib/monitoringIndexManage/monitoringIndexManage.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'ng-zTree'
        ]);
    }

})();
