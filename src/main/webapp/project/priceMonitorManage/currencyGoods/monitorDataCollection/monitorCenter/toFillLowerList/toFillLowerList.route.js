(function () {
    angular.module("app.toFillLowerList")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("toFillLowerList", {
                url: '/monitorCenter/toFillLowerList',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/toFillLowerList/toFillLowerList.html',
                        controller: 'ToFillLowerListCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadToFillLowerListFiles: loadToFillLowerListFiles
                }
            })
    }

    /* @ngInject */
    loadToFillLowerListFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadToFillLowerListFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/toFillLowerList/toFillLowerList.controller.js',
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/toFillLowerList/toFillLowerList.service.js',
            'pagination',//分页
            'chosen',
            'mCustomScrollbar' //滚动条
        ]);
    }
})();
