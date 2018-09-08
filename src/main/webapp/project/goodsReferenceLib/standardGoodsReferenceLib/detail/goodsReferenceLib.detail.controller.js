(function () {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .controller('GoodsReferenceLibDetailCtrl', GoodsReferenceLibDetailCtrl);

    GoodsReferenceLibDetailCtrl.$inject = ['$scope','$stateParams','pageInfDefault','goodsReferenceLibDetailService','coreService','$q','ngDialog'];

    /* @ngInject */
    function GoodsReferenceLibDetailCtrl($scope,$stateParams,pageInfDefault,goodsReferenceLibDetailService,coreService,$q,ngDialog) {
        var vm =this;
        vm.goodsid = $scope.ngDialogData.goodsid;
        vm.goods_type_id = $scope.ngDialogData.goods_type_id;
        vm.goods_type_name = $scope.ngDialogData.goods_type_name;
        vm.htmlType = $scope.ngDialogData.type;
        vm.cancelOp = cancelOp;
        vm.saveInfo = saveInfo;
        var fileInitOptions =  {
            fileListTitle:"附件列表",
            tab_name:"cf_goods",
            col_name:"goods_pic_uploaded",
            recordid:""
        };
        var fileLoadOptions ={
            tab_name:"cf_goods",
            col_name:"goods_pic_uploaded",
            recordid:""
        };



        activate();
        function activate() {
            coreService.getCategoryValues('GOODS_FAMILY,YESNO,DRUG_NATURE')
                .then(setCategoryValues)
            if(vm.htmlType!='add'){
                getGoodsDetail();
            }
            if (!angular.isUndefined(vm.goodsid)){

                initFileOptions(vm.goodsid);
            }else{
                initFileOptions("");
            }

        }
        function setCategoryValues(response) {
            var result = response.data;
            vm.goods_family= coreService.covertCategoryValueIdToInt(result["GOODS_FAMILY"]);
            vm.yesnoCatagory= coreService.covertCategoryValueIdToInt(result["YESNO"]);
            vm.drug_nature= coreService.covertCategoryValueIdToInt(result["DRUG_NATURE"]);

        }

        function getGoodsDetail() {
            var params = {id:vm.goodsid};
            goodsReferenceLibDetailService.getGoodsDetail( params)
                .then(function (resp) {
                    vm.goodsDetail = resp.data;
                    if(vm.goodsDetail.goods_properties!=undefined){
                        vm.goodsDetail.goods_properties = parseInt(vm.goodsDetail.goods_properties);
                    }
                    vm.goods_type_name = vm.goodsDetail.type_name;
                    //bar_code用于展示 barcode_id用于去后台找条形码实体
                    vm.bar_code = resp.data.bar_code;
                    vm.barcode_id = resp.data.barcode_id;
                    initFileOptions(vm.goodsDetail.id)
                })
        }
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }
        function saveInfo() {
            if ($scope.goodsDetail_form.$valid) {
                if(vm.goodsid!=undefined){
                    vm.goodsDetail.id = vm.goodsid;
                }
                if(vm.goods_type_id!=undefined){
                    vm.goodsDetail.goods_type_id = vm.goods_type_id;
                }
                if(vm.goodsDetail.delstatus===undefined){
                    vm.goodsDetail.delstatus = 0;
                }
                if(vm.bar_code!=undefined){
                    vm.cf_goods_bar_code  = {};
                    vm.cf_goods_bar_code.bar_code= vm.bar_code;
                    vm.cf_goods_bar_code.id= vm.barcode_id;
                }
                var params = {};
                delete vm.goodsDetail.type_name;
                delete vm.goodsDetail.bar_code;
                delete vm.goodsDetail.barcode_id;
                params.cf_goods = vm.goodsDetail;

                params.cf_goods_bar_code = vm.cf_goods_bar_code;
                goodsReferenceLibDetailService.saveInfo(params)
                    .then(saveGoodsSuccess)
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }
        function saveGoodsSuccess(response){
            //0是商品实体类，1是条形码实体类，这里更新id是为了防止页面未关闭直接修改条形码
            vm.goodsDetail = response.data[0];
            if(response.data[1]){
                vm.bar_code = response.data[1].bar_code;
                vm.barcode_id = response.data[1].id;
            }
            initFileOptions(vm.goodsDetail.id);
            AppTools.successTips("保存成功!");
        }



        /*
        附件
         */
        function initFileOptions(goodsid) {
            fileInitOptions.recordid = goodsid;
            fileLoadOptions.recordid = goodsid;
            initFileList();
        }
        function initFileList() {
            vm.fileInitOptions= fileInitOptions;
            vm.fileLoadOptions= fileLoadOptions;
        }
        /*
        附件结束
         */



    }
})();

