/**
 * Created by tr on 2018年8月7日10:26:41
 */
(function () {
    'use strict';
    angular
        .module('app.foreign_material')
        .controller('ForeignMaterialDetailCtrl', ForeignMaterialDetailCtrl);

    ForeignMaterialDetailCtrl.$inject = ['$state','$scope', 'ngDialog', 'SYSTEM', 'foreignMateriaDetailService','localStorageService']; // 初始化
    function ForeignMaterialDetailCtrl($state, $scope, ngDialog, SYSTEM, foreignMateriaDetailService,localStorageService) {
        var vm = this;
        vm.saveInfo = saveInfo;
        vm.cancelOp = cancelOp;
        var fmInfo = angular.copy($scope.ngDialogData.fmInfo); // 材料信息
        var fmId = ""; // 材料ID


        /**附件**/
        var fileInitOptions =  {
            fileListTitle:"附件列表",
            tab_name:"t_foreign_material",
            col_name:"upload",
            recordid:""
        }
        var fileLoadOptions ={
            tab_name:"t_foreign_material",
            col_name:"upload",
            recordid:""
        }

        function activate() {
            setFmInfo();
            if (!angular.isUndefined(fmId)) {
                initFileOptions(fmId);
            } else {
                initFileOptions("");
            }
        }
        activate();

        // 修改时页面赋值
        function setFmInfo() {
            if(fmInfo != null){
                vm.foreignMaterial = fmInfo;
                fmId = fmInfo.id;
            }else{
                vm.foreignMaterial = {};
            }
        }


        function saveInfo() {
            if ($scope.foreignMaterial_detail_form.$valid) {
                var params = vm.foreignMaterial; // 双向绑定
                foreignMateriaDetailService.saveInfo(params)
                    .then(saveSuccess)
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }
        }
        function saveSuccess(response){
            vm.fmInfo = response.data;
            initFileOptions(vm.fmInfo.id);
            AppTools.successTips("保存成功！");
        }

        function initFileOptions(fmId) {
            fileInitOptions.recordid = fmId;
            fileLoadOptions.recordid = fmId;
            initFileList();
        }
        function initFileList() {
            vm.fileInitOptions = fileInitOptions;
            vm.fileLoadOptions = fileLoadOptions;
        }

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }







    }
})();