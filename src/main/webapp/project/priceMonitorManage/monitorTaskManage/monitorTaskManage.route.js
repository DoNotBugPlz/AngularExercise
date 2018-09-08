(function () {
    angular.module("app.monitorTaskManage")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("monitorTaskManage", {
                url: '/monitorTaskManage',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/monitorTaskManage/monitorTaskManage.html',
                        controller: 'MonitorTaskManageController',
                        // 以goods作为controller引用
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitorTaskManageFiles: loadMonitorTaskManageFiles
                }
            })
            .state("addTask", {
                url: '/addTask',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/monitorTaskManage/addTask/addTask.html',
                        controller: 'AddTaskController',
                        // 以goods作为controller引用
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadAddTaskFiles: loadAddTaskFiles
                }
            })


    }

    /* @ngInject */
    loadMonitorTaskManageFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMonitorTaskManageFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/monitorTaskManage/monitorTaskManage.controller.js',
            './priceMonitorManage/monitorTaskManage/monitorTaskManage.service.js',
            'pagination',
            'mCustomScrollbar',
            'chosen'

        ]);
    }
    /* @ngInject */
    loadAddTaskFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadAddTaskFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/monitorTaskManage/addTask/addTask.controller.js',
            './priceMonitorManage/monitorTaskManage/addTask/addTask.service.js',
            'mCustomScrollbar',
            'chosen'

        ]);
    }



})();
