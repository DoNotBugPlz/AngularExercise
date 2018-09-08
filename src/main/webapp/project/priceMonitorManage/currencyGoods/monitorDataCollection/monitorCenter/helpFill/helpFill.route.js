(function () {
    angular.module("app.helpFill")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("helpFill", {
                url: '/monitorCenter/helpFill',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/helpFill/helpFill.html',
                        controller: 'HelpFillCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadHelpFillFiles: loadHelpFillFiles
                }
            })
    }

    /* @ngInject */
    loadHelpFillFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadHelpFillFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/helpFill/helpFill.controller.js',
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/helpFill/helpFill.service.js',
            'pagination',//分页
            'chosen',
            'mCustomScrollbar',//滚动条
            'My97DatePicker'//时间控件
        ]);
    }
})();
