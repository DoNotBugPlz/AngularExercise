(function () {
    angular.module("app.reportRecord")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("reportRecord", {
                url: '/monitorCenter/reportRecord',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/reportRecord/reportRecord.html',
                        controller: 'ReportRecordCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadReportRecordFiles: loadReportRecordFiles
                }
            })
    }

    /* @ngInject */
    loadReportRecordFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadReportRecordFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/reportRecord/reportRecord.controller.js',
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/reportRecord/reportRecord.service.js',
            'pagination',//分页
            'chosen',
            'mCustomScrollbar',//滚动条
            'My97DatePicker'//时间控件
        ]);
    }
})();
