/**
 * Created by tr on 2018年8月7日10:26:41
 */
(function () {
    'use strict';
    angular
        .module('app.wh')
        .controller('WhDetailCtrl', WhDetailCtrl);

    WhDetailCtrl.$inject = ['$state','$scope', 'ngDialog', 'SYSTEM', 'whDetailService','localStorageService']; // 初始化
    function WhDetailCtrl($state, $scope, ngDialog, SYSTEM, whDetailService,localStorageService) {

        var vm = this;
        vm.saveInfo = saveInfo;
        vm.cancelOp = cancelOp;
        var editInfo = angular.copy($scope.ngDialogData.editInfo); // 修改信息
        var pkId = ""; // ID

        function activate() {
            setEditInfo();
        }
        activate();

        // 修改时页面赋值
        function setEditInfo() {
            if(editInfo != null){
                var params = {id : editInfo.id};
                whDetailService.getInfoById(params)
                    .then(setInfo)
            }else{
                vm.wh = {};
            }
        }

        function setInfo(response) {
            vm.wh = response.data;
        }


        function saveInfo() {
            if ($scope.wh_detail_form.$valid) {
                var params = vm.wh; // 双向绑定
                whDetailService.saveInfo(params)
                    .then(saveSuccess)
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }
        }
        function saveSuccess(response){
            vm.whInfo = response.data;
            AppTools.successTips("保存成功！");
            ngDialog.close($scope.ngDialogId);
        }

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }







    }

})();