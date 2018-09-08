
(function (rootPath) {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .service('goodsReferenceLibService', goodsReferenceLibService);
    goodsReferenceLibService.$inject = ['$http'];
    /* @ngInject */
    function goodsReferenceLibService($http) {


                                                                                                                                                               this.loadGoodsTree = loadGoodsTree;
        this.loadGoodsTreeRootNode = loadGoodsTreeRootNode;
        this.loadGoodsList = loadGoodsList;
        this.loadBeloneCategory = loadBeloneCategory;
        this.changeStatue = changeStatue;
        this.removeGoodsType = removeGoodsType;


        function loadGoodsTree(params) {
            return $http({
                url: rootPath + "Cf_goods/loadGoodsTree.do",
                method: 'GET',
                params:params
            })
        }
        function loadGoodsTreeRootNode(params) {
            return $http({
                url: rootPath + "Cf_goods/loadGoodsTreeRootNode.do",
                method: 'GET',
                params:params
            })
        }

        function loadGoodsList(params) {
            return $http({
                url: rootPath + "Cf_goods/loadGoodsList.do",
                method: 'GET',
                params: params
            })
        }
        function loadBeloneCategory(params) {
            return $http({
                url: rootPath + "Cf_goods/loadBeloneCategory.do",
                method: 'GET',
                params: params
            })
        }

        function changeStatue(params) {
            return $http({
                url: rootPath + "Cf_goods/changeStatue.do",
                method: 'POST',
                data: params
            })
        }
        function removeGoodsType(params) {
            return $http({
                url: rootPath + "Cf_goods_type/removeGoodsType.do",
                method: 'GET',
                params: params
            })
        }


    }

})('../');


