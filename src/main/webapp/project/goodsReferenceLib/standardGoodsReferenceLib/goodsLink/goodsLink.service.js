(function (rootPath) {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .service('goodsLinkService', goodsLinkService);
    goodsLinkService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function goodsLinkService($http, SYSTEM) {

        this.loadGoodsLinkList = loadGoodsLinkList;
        this.changeGoodsLinkStatus = changeGoodsLinkStatus;

        function loadGoodsLinkList(params) {
            return $http({
                url: rootPath + "Cf_goods_link/loadGoodsLinkList.do",
                method: 'GET',
                params:params
            })
        }

        function changeGoodsLinkStatus(params) {
            return $http({
                url: rootPath + "Cf_goods_link/changeGoodsLinkStatus.do",
                method: 'GET',
                params:params
            })
        }
    }

})('../');


