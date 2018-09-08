(function () {
    angular.module("app.dept")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("dept", {
                url: '/dept',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './system/dept/dept.html',
                        controller: 'DeptCtrl',
                        controllerAs: 'dept'
                    }
                },
                resolve: {
                    loadDeptFiles: loadDeptFiles
                }
            })
            .state("deptDetail", {
                url: '/deptDetail',
                params: {
                    deptId:''
                },
                parent: "dept",
                views: {
                    'details@dept': {
                        templateUrl: './system/dept/deptDetail/dept.detail.html',
                        controller: 'DeptDetailCtrl',
                        controllerAs: 'deptDetail'
                    }
                },
                resolve: {
                    loadDeptDetailFiles: loadDeptDetailFiles
                }
            })
    }

    /* @ngInject */
    loadDeptFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadDeptFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './system/dept/dept.controller.js',
            './system/dept/dept.service.js',
            'ng-zTree'
        ]);
    }

    /* @ngInject */
    loadDeptDetailFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadDeptDetailFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './system/dept/deptDetail/dept.detail.controller.js',
            './system/dept/deptDetail/dept.detail.service.js'
        ]);
    }

})();
