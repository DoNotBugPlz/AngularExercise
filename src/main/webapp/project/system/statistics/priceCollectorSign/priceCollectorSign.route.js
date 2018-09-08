(function () {
    angular.module("app.priceCollectorSign")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("priceCollectorSign", {
                url: '/statistics/priceCollectorSign',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './system/statistics/priceCollectorSign/priceCollectorSign.html',
                        controller: 'PriceCollectorSignCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadPriceCollectorSignFiles: loadPriceCollectorSignFiles
                }
            })
    }

    /* @ngInject */
    loadPriceCollectorSignFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadPriceCollectorSignFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './system/statistics/priceCollectorSign/priceCollectorSign.controller.js',
            './system/statistics/priceCollectorSign/priceCollectorSign.service.js',
            'ng-zTree',
            'pagination',//分页
            'mCustomScrollbar',//滚动条
            'My97DatePicker'//时间控件
        ]);
    }


})();
