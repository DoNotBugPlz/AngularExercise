(function () {
    'use strict';

    angular
        .module('app.barCodeManage')
        .controller('barCodeManageAddCtrl', barCodeManageAddCtrl);
    barCodeManageAddCtrl.$inject = ['$scope', 'barCodeManageAddService', 'ngDialog', 'coreService'];

    /* @ngInject */
    function barCodeManageAddCtrl($scope, barCodeManageAddService, ngDialog, coreService) {
        var vm = this;
        var barCodeManageId = $scope.ngDialogData.barCodeManageId;
        //加载商品条形码详情
        var loadbarCodeManage = loadbarCodeManage;
        //保存条码信息
        vm.saveBarCodeManage = saveBarCodeManage;
        vm.cancelOp = cancelOp;
        vm.category_delstatus = [{id: 0, text: "启用"}, {id: 1, text: "停用"}];
        activate();

        function activate() {
            if (!angular.isUndefined(barCodeManageId)) {
                loadbarCodeManage(barCodeManageId)
            }
        }

        //加载商品条形码详情
        function loadbarCodeManage(barCodeManageId) {
            var params = {id: barCodeManageId};
            barCodeManageAddService.loadbarCodeManage(params)
                .then(setbarCodeManage);
        }

        function setbarCodeManage(response) {
            var result = response.data.data;
            var barCodeManageList = result.rows;
            //历史条形码列表
            vm.hisBarCodeList = [];
            //当前条形码
            vm.currBarCode = {};
            angular.forEach(barCodeManageList, function (data, index, array) {
                if (data.is_last_version === 1) {
                    vm.currBarCode.bar_code = data.bar_code;
                    vm.currBarCode.uploaded_time = data.uploaded_time;
                    vm.currBarCode.delstatus = data.delstatus;
                } else {
                    vm.hisBarCodeList.push(data);
                }
            });
            vm.barCodeManage = response.data.data.rows[0];
        }

        vm.checkNumber = function (obj, attr) {
            obj[attr] = obj[attr].replace(/\D/g, "");

        };

        //保存
        function saveBarCodeManage() {
            vm.barCodeManage.goods_id = barCodeManageId;
            if (vm.barCodeManage.id == "" && !vm.barCodeManage.bar_code_new) {
                AppTools.errorTips("请输入条形码！")
            } else {
                if (!vm.barCodeManage.bar_code_new) {
                    vm.barCodeManage.flag = "true";
                } else {
                    vm.barCodeManage.flag = "false";
                }
                vm.barCodeManage.delstatus = vm.currBarCode.delstatus;
                var params = {};
                params["barCodeManage"] = vm.barCodeManage;
                params["hisBarCodeList"] = vm.hisBarCodeList;
                barCodeManageAddService.saveBarCodeManage(params)
                    .then(saveBarCodeManageSuccess)

            }
        }

        function saveBarCodeManageSuccess(response) {
            if ("Exist" === response.data) {
                AppTools.errorTips("该条形码已存在！");
            } else {
                vm.barCodeManage = response.data;
                AppTools.successTips("保存成功！");
                cancelOp();
            }

        }

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

    }
})();

