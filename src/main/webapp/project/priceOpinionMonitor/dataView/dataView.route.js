(function () {
    angular.module("app.dataView")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("dataView", {
                url: '/priceOpinionMonitor/dataView',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl:  "./priceOpinionMonitor/dataView/dataView.html",
                        controller: 'DataViewCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadDataViewFiles: loadDataViewFiles
                }
            })
    }

    /* @ngInject */
    loadDataViewFiles.$inject = ['$ocLazyLoad'];
    /* @ngInject */
    function loadDataViewFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            "./priceOpinionMonitor/dataView/dataView.controller.js",
            "./priceOpinionMonitor/dataView/dataView.service.js",
            "./lib/echarts/3.5.4/echarts.js",
            'pagination',//分页
            'chosen',
            'mCustomScrollbar',//滚动条
            'My97DatePicker'//时间控件
        ]) .then(loadZTreeExcheckFiles);

        function loadZTreeExcheckFiles() {
            return $ocLazyLoad.load([
                "./lib/echarts/3.5.4/worldcloud.js"
            ]);
        }
    }
})();
