(function () {
    angular.module("app.dataList")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("dataList", {
                url: '/priceOpinionMonitor/dataList',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: "./priceOpinionMonitor/dataList/dataList.html",
                        controller: 'DataListCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadDataListFiles: loadDataListFiles
                }
            })
    }

    /* @ngInject */
    loadDataListFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadDataListFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            "./priceOpinionMonitor/dataList/dataList.controller.js",
            "./priceOpinionMonitor/dataList/dataList.service.js",
            'pagination',//分页
            'mCustomScrollbar',//滚动条
            'chosen',
            'My97DatePicker'//时间控件
        ]);
    }
})();
