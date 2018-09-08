(function () {
    angular.module("app.organization")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("organization", {
                url: '/organization',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './system/organization/organization.html',
                        controller: 'OrganizationCtrl',
                        controllerAs: 'organization'
                    }
                },
                resolve: {
                    loadOrganizationFiles: loadOrganizationFiles
                }
            })
            .state("organization.deptDetail", {
                url: '/deptDetail?:deptId&:parentId',
                params: {
                    deptId:'',
                    parentId:''
                },
                parent: "organization",
                views: {
                    'details@organization': {
                        templateUrl: './system/organization/deptDetail/dept.detail.html',
                        controller: 'DeptDetailCtrl',
                        controllerAs: 'deptDetail'
                    }
                },
                resolve: {
                    loadDeptDetailFiles: loadDeptDetailFiles
                }
            })
            .state("organization.monitorDetail", {
                url: '/monitorDetail?:deptId&:parentId',
                params: {
                    deptId:'',
                    parentId:''
                },
                parent: "organization",
                views: {
                    'details@organization': {
                        templateUrl: './system/organization/monitorDetail/monitor.detail.html',
                        controller: 'MonitorDetailCtrl',
                        controllerAs: 'monitorDetail'
                    }
                },
                resolve: {
                    loadMonitorDetailFiles: loadMonitorDetailFiles
                }
            })
    }

    /* @ngInject */
    loadOrganizationFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadOrganizationFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './system/organization/organization.controller.js',
            './system/organization/organization.service.js',
            'ng-zTree'
        ]);
    }
    
    /* @ngInject */
    loadDeptDetailFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadDeptDetailFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './system/organization/deptDetail/dept.detail.controller.js',
            './system/organization/deptDetail/dept.detail.service.js'
        ]);
    }

    /* @ngInject */
    loadMonitorDetailFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadMonitorDetailFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './system/organization/monitorDetail/monitor.detail.controller.js',
            './system/organization/monitorDetail/monitor.detail.service.js'
        ]);
    }

})();
