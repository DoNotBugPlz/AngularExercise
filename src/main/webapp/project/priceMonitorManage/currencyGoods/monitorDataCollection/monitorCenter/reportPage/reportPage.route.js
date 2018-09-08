(function () {
    angular.module("app.reportPage")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("reportPage", {
                url: '/monitorCenter/reportPage',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/reportPage/reportPage.html',
                        controller: 'ReportPageCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadReportPageFiles: loadReportPageFiles
                }
            })
    }

    /* @ngInject */
    loadReportPageFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadReportPageFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/reportPage/reportPage.controller.js',
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/reportPage/reportPage.service.js',
            'pagination',//分页
            'chosen',
            'mCustomScrollbar',//滚动条
            'My97DatePicker'//时间控件
        ]);
    }
})();
