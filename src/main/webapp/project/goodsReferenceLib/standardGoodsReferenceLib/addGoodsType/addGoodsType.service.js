(function (rootPath) {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .service('addGoodsTypeService', addGoodsTypeService);
    addGoodsTypeService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function addGoodsTypeService($http, SYSTEM) {
        this.savegoodsInfo = savegoodsInfo;
        //商品类别新增
        function savegoodsInfo(params) {
            return $http({
                url: rootPath + "Cf_goods_type/saveInfo.do",
                method: 'POST',
                data: params
            })
        }
    }

})('../');


