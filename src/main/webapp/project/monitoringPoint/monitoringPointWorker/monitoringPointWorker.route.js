(function () {
    angular.module("app.monitoringPointWorker")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("monitoringPointWorker", {
                url: '/monitoringPointWorker',
                params: {menuName: '待填报列表 - 监测点工作人员'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './monitoringPoint/monitoringPointWorker/monitoringPointWorker.html',
                        controller: 'MonitoringPointWorkerCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitoringPointWorkerFiles: loadMonitoringPointWorkerFiles
                }
            })

            .state("monitoringPointWorker.monitoringPointWrite", {
                url: '/monitoringPointWorker/monitoringPointWrite',
                params: {
                    menuName: '填报界面 - 填报前',
                    excelId: ''
                },
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './monitoringPoint/monitoringPointWrite/monitoringPointWrite.html',
                        controller: 'MonitoringPointWriteCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitoringPointWriteFiles: loadMonitoringPointWriteFiles
                }
            })
    }

    /* @ngInject */
    loadMonitoringPointWorkerFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMonitoringPointWorkerFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './monitoringPoint/monitoringPointWorker/monitoringPointWorker.controller.js',
            './monitoringPoint/monitoringPointWorker/monitoringPointWorker.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }

    /* @ngInject */
    loadMonitoringPointWriteFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMonitoringPointWriteFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './monitoringPoint/monitoringPointWrite/monitoringPointWrite.controller.js',
            './monitoringPoint/monitoringPointWrite/monitoringPointWrite.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }

})();
