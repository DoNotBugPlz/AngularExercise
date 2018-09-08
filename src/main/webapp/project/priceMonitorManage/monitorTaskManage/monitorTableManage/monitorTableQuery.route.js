(function () {
    angular.module("app.monitorTableQuery")
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("monitorTableQuery", {
                url: '/monitorTableManage/monitorTableQuery',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/monitorTaskManage/monitorTableManage/monitorTableQuery.html',
                        controller: 'MonitorTableQueryCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitorTableQueryFiles: loadMonitorTableQueryFiles
                }
            })

    }

    /* @ngInject */
    loadMonitorTableQueryFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMonitorTableQueryFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/monitorTaskManage/monitorTableManage/monitorTableQuery.controller.js',
            './priceMonitorManage/monitorTaskManage/monitorTableManage/monitorTableQuery.service.js',
             'chosen',
            'pagination',//分页
            'mCustomScrollbar',//滚动条
            'My97DatePicker'//时间控件

        ]);
    }

})();
