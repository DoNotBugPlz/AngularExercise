(function () {
    angular.module("app.taskAdjustRecord")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("taskAdjustRecord", {
                url: '/monitorCenter/taskAdjustRecord',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/taskAdjustRecord.html',
                        controller: 'TaskAdjustRecordCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadTaskAdjustRecordFiles: loadTaskAdjustRecordFiles
                }
            })
    }

    /* @ngInject */
    loadTaskAdjustRecordFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadTaskAdjustRecordFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/taskAdjustRecord.controller.js',
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/taskAdjustRecord.service.js',
            'pagination',//分页
            'chosen',
            'My97DatePicker',//时间控件
            'mCustomScrollbar' //滚动条
        ]);
    }
})();
