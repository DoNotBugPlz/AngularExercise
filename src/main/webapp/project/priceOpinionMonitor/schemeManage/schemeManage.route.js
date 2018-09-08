(function () {
    angular.module("app.schemeManage")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("schemeManage", {
                url: '/priceOpinionMonitor/schemeManage',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: "./priceOpinionMonitor/schemeManage/schemeManage.html",
                        controller: 'SchemeManageCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadSchemeManageFiles: loadSchemeManageFiles
                }
            })
    }

    /* @ngInject */
    loadSchemeManageFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadSchemeManageFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            "./priceOpinionMonitor/schemeManage/schemeManage.controller.js",
            "./priceOpinionMonitor/schemeManage/schemeManage.service.js",
            'pagination',//分页
            'chosen',
            'mCustomScrollbar' //滚动条
        ]);
    }
})();
