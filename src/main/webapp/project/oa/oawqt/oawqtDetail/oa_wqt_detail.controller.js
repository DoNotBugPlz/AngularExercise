/**
 * Created by tr on 2018年8月7日10:26:41
 */
(function () {
    'use strict';
    angular
        .module('app.foreign_material')
        .controller('WqtDetailCtrl', WqtDetailCtrl);

    WqtDetailCtrl.$inject = ['$state','$scope', 'ngDialog', 'SYSTEM', 'wqtDetailService','localStorageService']; // 初始化
    function WqtDetailCtrl($state, $scope, ngDialog, SYSTEM, wqtDetailService,localStorageService) {
        var vm = this;
        vm.saveInfo = saveInfo;
        vm.cancelOp = cancelOp;
        var editInfo = angular.copy($scope.ngDialogData.editInfo); // 修改信息
        var pkId = ""; // ID


        /**附件**/
        var fileInitOptions =  {
            fileListTitle:"附件列表",
            tab_name:"oa_wqt",
            col_name:"upload",
            recordid:""
        }
        var fileLoadOptions ={
            tab_name:"oa_wqt",
            col_name:"upload",
            recordid:""
        }

        function activate() {
            setEditInfo();
            if (!angular.isUndefined(pkId)) {
                initFileOptions(pkId);
            } else {
                initFileOptions("");
            }
        }
        activate();

        // 修改时页面赋值
        function setEditInfo() {
            if(editInfo != null){
                var params = {id : editInfo.id};
                wqtDetailService.getInfoById(params)
                    .then(setInfo)
            }else{
                vm.wqt = {};
            }
        }

        function setInfo(response) {
            vm.wqt = response.data;
        }


        function saveInfo() {
            if ($scope.wqt_detail_form.$valid) {
                var params = vm.wqt; // 双向绑定
                wqtDetailService.saveInfo(params)
                    .then(saveSuccess)
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }
        }
        function saveSuccess(response){
            vm.wqtInfo = response.data;
            initFileOptions(vm.wqtInfo.id);
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