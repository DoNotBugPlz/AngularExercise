(function () {
    angular.module("app.goodsReferenceLib")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("goodsReferenceLib", {
                url: '/cf_goods',
                params: {menuName: '商品基准库',goodsid:null},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './goodsReferenceLib/standardGoodsReferenceLib/goodsReferenceLib.html',
                        controller: 'GoodsReferenceLibCtrl',
                        // 以goods作为controller引用
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadGoodsReferenceLibFiles: loadGoodsReferenceLibFiles
                }
            })


    }

    /* @ngInject */
    loadGoodsReferenceLibFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadGoodsReferenceLibFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './goodsReferenceLib/standardGoodsReferenceLib/goodsReferenceLib.controller.js',
            './goodsReferenceLib/standardGoodsReferenceLib/goodsReferenceLib.service.js',
            'pagination',
            'mCustomScrollbar',
            'ng-zTree',
            'chosen'

        ]);
    }



})();
