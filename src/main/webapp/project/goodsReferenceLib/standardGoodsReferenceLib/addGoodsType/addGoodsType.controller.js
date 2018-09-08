(function () {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .controller('AddGoodsTypeCtrl', AddGoodsTypeCtrl);

    AddGoodsTypeCtrl.$inject = ['$scope','$stateParams','pageInfDefault','addGoodsTypeService','coreService','$q','ngDialog'];

    /* @ngInject */
    function AddGoodsTypeCtrl($scope,$stateParams,pageInfDefault,addGoodsTypeService,coreService,$q,ngDialog) {
        var vm =this;
        vm.parentid = $scope.ngDialogData.parentid;
        vm.goods_family = $scope.ngDialogData.goods_family;
        vm.saveGoogsType = saveGoogsType;
        vm.cancelOp = cancelOp;

        activate();
        function activate() {



        }
        function saveGoogsType() {
            var params = {};
            //goods_classes 商品类型（1基准商品2建材商品3民生商品）
            var cf_goods_type = {delstatus:0,parentid:vm.parentid,type_name:vm.type_name,goods_family:vm.goods_family,sortindex:vm.sortindex,goods_classes:1};
            params.cf_goods_type = cf_goods_type;
            addGoodsTypeService.savegoodsInfo(params)
                .then(function (resp) {
                    cancelOp();
                })
        }
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }




    }
})();

