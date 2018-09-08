(function () {
    angular.module("app.monitorTaskChangeRequest")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("monitorTaskChangeRequest", {
                url: '/monitorTaskChangeRequest/monitorTaskChangeRequest',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/monitorTaskManage/monitorTaskChangeRequest/monitorTaskChangeRequest.html',
                        controller: 'MonitorTaskChangeRequestController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitorTaskChangeRequestFiles: loadMonitorTaskChangeRequestFiles
                }
            })
            // .state("addTask", {
            //     url: '/addTask',
            //     parent: "app",
            //     views: {
            //         'panel@app': {
            //             templateUrl: './priceMonitorManage/monitorTaskChangeRequest/addTask/addTask.html',
            //             controller: 'AddTaskController',
            //             // 以goods作为controller引用
            //             controllerAs: 'vm'
            //         }
            //     },
            //     resolve: {
            //         loadAddTaskFiles: loadAddTaskFiles
            //     }
            // })


    }

    /* @ngInject */
    loadMonitorTaskChangeRequestFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMonitorTaskChangeRequestFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/monitorTaskManage/monitorTaskChangeRequest/monitorTaskChangeRequest.controller.js',
            './priceMonitorManage/monitorTaskManage/monitorTaskChangeRequest/monitorTaskChangeRequest.service.js',
            'mCustomScrollbar',
            'chosen'
        ]);
    }




})();
