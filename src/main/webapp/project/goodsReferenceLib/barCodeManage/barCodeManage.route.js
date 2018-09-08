(function () {
    angular.module("app.barCodeManage")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("barCodeManage", {
                url: '/barCodeManage',
                params: {menuName: '商品条形码列表'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './goodsReferenceLib/barCodeManage/barCodeManage.html',
                        controller: 'BarCodeManageCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadBarCodeManageFiles: loadBarCodeManageFiles
                }
            })
    }

    /* @ngInject */
    loadBarCodeManageFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadBarCodeManageFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './goodsReferenceLib/barCodeManage/barCodeManage.controller.js',
            './goodsReferenceLib/barCodeManage/barCodeManage.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'

        ]);
    }

})();
