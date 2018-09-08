(function () {
    angular.module("app.demo")
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("demo", {
                url: '/demo',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './demo/demo_list_form/demo_new.html',
                        controller: 'DemoCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadDemoFiles: loadDemoFiles
                }
            })
            .state("demo_old", {
                url: '/demo_old',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './demo/demo_list_form/demo.html',
                        controller: 'DemoCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadDemoFiles: loadDemoFiles
                }
            })
    }

    /* @ngInject */
    loadDemoFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadDemoFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './demo/demo_list_form/demo.controller.js',
            './demo/demo_list_form/demo.service.js',
             'chosen',
            'pagination',//分页
            'mCustomScrollbar',//滚动条
            'My97DatePicker'//时间控件

        ]);
    }

})();
