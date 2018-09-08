(function (rootPath) {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .service('goodsReferenceLibDetailService', goodsReferenceLibDetailService);
    goodsReferenceLibDetailService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function goodsReferenceLibDetailService($http, SYSTEM) {

        this.getGoodsDetail = getGoodsDetail;
        this.saveInfo = saveInfo;




        function getGoodsDetail(params) {
            return $http({
                url: rootPath + "Cf_goods/getGoodsDetail.do",
                method: 'GET',
                params: params
            })
        }

        function saveInfo(params) {
            return $http({
                url: rootPath + "Cf_goods/saveInfo.do",
                method: 'POST',
                data: params
            })
        }



    }

})('../');


