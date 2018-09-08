(function () {
    angular.module("app.dataImport")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("dataImport", {
                url: '/monitorCenter/dataImport',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/dataImport/dataImport.html',
                        controller: 'DataImportCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadDataImportFiles: loadDataImportFiles
                }
            })
    }

    /* @ngInject */
    loadDataImportFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadDataImportFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/dataImport/dataImport.controller.js',
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/dataImport/dataImport.service.js',
            'pagination',//分页
            'chosen',
            'mCustomScrollbar',//滚动条
            'My97DatePicker'//时间控件
        ]);
    }
})();
