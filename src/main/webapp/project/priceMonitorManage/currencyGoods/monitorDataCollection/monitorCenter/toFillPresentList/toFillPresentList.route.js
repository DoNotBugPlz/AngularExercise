(function () {
    angular.module("app.toFillPresentList")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("toFillPresentList", {
                url: '/monitorCenter/toFillPresentList',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/toFillPresentList/toFillPresentList.html',
                        controller: 'ToFillPresentListCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadToFillPresentListFiles: loadToFillPresentListFiles
                }
            })
    }

    /* @ngInject */
    loadToFillPresentListFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadToFillPresentListFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/toFillPresentList/toFillPresentList.controller.js',
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/toFillPresentList/toFillPresentList.service.js',
            'pagination',//分页
            'mCustomScrollbar',//滚动条
            'chosen',
            'My97DatePicker'//时间控件
        ]);
    }
})();
