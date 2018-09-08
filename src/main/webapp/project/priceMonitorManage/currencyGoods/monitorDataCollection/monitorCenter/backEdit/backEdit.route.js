(function () {
    angular.module("app.backEdit")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("backEdit", {
                url: '/monitorCenter/backEdit',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/backEdit/backEdit.html',
                        controller: 'BackEditCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadBackEditFiles: loadBackEditFiles
                }
            })
    }

    /* @ngInject */
    loadBackEditFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadBackEditFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/backEdit/backEdit.controller.js',
            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/backEdit/backEdit.service.js',
            'pagination',//分页
            'chosen',
            'mCustomScrollbar',//滚动条
            'My97DatePicker'//时间控件
        ]);
    }
})();
