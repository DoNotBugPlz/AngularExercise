(function (rootPath) {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .service('addGoodsLinkService', addGoodsLinkService);
    addGoodsLinkService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function addGoodsLinkService($http, SYSTEM) {
        this.loadGoodsList = loadGoodsList;
        this.saveGoodsLinkDetail = saveGoodsLinkDetail;

        function loadGoodsList(params) {
            return $http({
                url: rootPath + "Cf_goods/loadGoodsList.do",
                method: 'GET',
                params: params
            })
        }

        function saveGoodsLinkDetail(params) {
            return $http({
                url: rootPath + "Cf_goods_link/saveInfo.do",
                method: 'POST',
                data: params
            })
        }
    }

})('../');


