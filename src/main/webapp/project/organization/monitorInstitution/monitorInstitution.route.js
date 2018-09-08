(function () {
    angular.module("app.monitorInstitution")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("monitorInstitution", {
                url: '/monitorInstitution',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './organization/monitorInstitution/monitorInstitution.html',
                        controller: 'MonitorInstitutionCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitorInstitutionCtrl: loadMonitorInstitutionCtrl
                }
            })
            .state("monitorInstitution.list", {
                url: '/monitorInstitution/list',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './organization/monitorInstitution/list/monitorInstitution_list.html',
                        controller: 'MonitorInstitutionListCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitorInstitutionListCtrl: loadMonitorInstitutionListCtrl
                }
            })
            .state("monitorInstitution.detail", {
                url: '/detail?:deptId&:parentId&:deptType&:editFlag',
                params: {
                    deptId:'',
                    parentId:'',
                    deptType:'',
                    editFlag:''
                },
                cache:false,
                parent: "monitorInstitution",
                views: {
                    'details@monitorInstitution': {
                        templateUrl: './organization/monitorInstitution/detail/monitorInstitution_detail.html',
                        controller: 'MonitorInstitutionDetailCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitorInstitutionDetailFiles: loadMonitorInstitutionDetailFiles
                }
            })
            .state("monitorInstitution.detail_view", {
                url: '/detail_view?:deptId&:parentId&:deptType&:editFlag',
                params: {
                    deptId:'',
                    parentId:'',
                    deptType:'',
                    editFlag:''
                },
                cache:false,
                parent: "monitorInstitution",
                views: {
                    'details@monitorInstitution': {
                        templateUrl: './organization/monitorInstitution/detail/monitorInstitution_detail_view.html',
                        controller: 'MonitorInstitutionDetailCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitorInstitutionDetailViewFiles: loadMonitorInstitutionDetailViewFiles
                }
            })
            .state("monitorInstitution.staff", {
                url: '/monitorInstitution/staff',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './organization/monitorInstitution/staff/monitorInstitution_staff.html',
                        controller: 'MonitorInstitutionStaffCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMonitorInstitutionStaffCtrl: loadMonitorInstitutionStaffCtrl
                }
            })
    }

    /* @ngInject */
    loadMonitorInstitutionCtrl.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadMonitorInstitutionCtrl($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/monitorInstitution/monitorInstitution.controller.js',
            './organization/monitorInstitution/monitorInstitution.service.js',
            'ng-zTree',
            'chosen'
        ]);
    }

    /* @ngInject */
    loadMonitorInstitutionListCtrl.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadMonitorInstitutionListCtrl($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/monitorInstitution/list/monitorInstitution_list.controller.js',
            './organization/monitorInstitution/monitorInstitution.service.js',
            'chosen',
            'mCustomScrollbar',
            'pagination'//分页
        ]);
    }

    /* @ngInject */
    loadMonitorInstitutionDetailFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadMonitorInstitutionDetailFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/monitorInstitution/detail/monitorInstitution_detail.controller.js',
            './organization/monitorInstitution/monitorInstitution.service.js',
            'mCustomScrollbar',
            'chosen'
        ]);
    }

    /* @ngInject */
    loadMonitorInstitutionDetailViewFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadMonitorInstitutionDetailViewFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/monitorInstitution/detail/monitorInstitution_detail.controller.js',
            './organization/monitorInstitution/monitorInstitution.service.js',
            'mCustomScrollbar',
            'chosen'
        ]);
    }

    /* @ngInject */
    loadMonitorInstitutionStaffCtrl.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadMonitorInstitutionStaffCtrl($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/monitorInstitution/staff/monitorInstitution_staff.controller.js',
            './organization/monitorInstitution/monitorInstitution.service.js',
            'mCustomScrollbar',
            'My97DatePicker',
            'ng-zTree',
            'chosen',
            'pagination'//分页
        ]);
    }


})();
