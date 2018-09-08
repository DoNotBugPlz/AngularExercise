/**
 * Created by tr on 2018年8月7日10:26:41
 */
(function () {
    'use strict';

    angular
        .module('app.roles')
        .controller('RolesDetailCtrl', RolesDetailCtrl);

    RolesDetailCtrl.$inject = ['$state','$scope', 'ngDialog', 'SYSTEM', 'rolesDetailService']; // 初始化
    function RolesDetailCtrl($state, $scope, ngDialog, SYSTEM, rolesDetailService) {
        var vm = this;

        // type：0 新增 1 修改
        var type = $scope.ngDialogData.type;

        // 修改时 传入的角色信息
        var roleinfo = angular.copy($scope.ngDialogData.roleinfo);
        var setRoleInfo = setRoleInfo;
        vm.saveOp = saveOp;
        vm.cancelOp = cancelOp;
        function activate() {
            setRoleInfo();
        }

        // 角色信息
        function setRoleInfo() {
            if ('1' == type) {
                vm.roleInfo = roleinfo;
            } else {
                vm.roleInfo = {};
            }
        }

        // 保存
        function saveOp() {
            window.angular.element(":input").blur(); // form表单校验
            if ($scope.role_detail_form.$valid) {
                var arr = [];
                arr.push(vm.roleInfo);
                var params = {changeDatas: JSON.stringify(arr)};
                rolesDetailService.addOrUpdateRoles(params)
                    .then(function (response) {
                        AppTools.successTips("保存成功！");
                        var reData = {issave: true};
                        ngDialog.close($scope.ngDialogId,reData);
                    })
            } else {
                AppTools.errorTips("请完善信息！");
            }
        }

        // 取消
        function cancelOp() {
            var reData = {issave: false};
            ngDialog.close($scope.ngDialogId,reData);
        }
        activate();
    }
})();