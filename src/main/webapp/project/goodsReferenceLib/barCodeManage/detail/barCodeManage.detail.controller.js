(function () {
    'use strict';

    angular
        .module('app.barCodeManage')
        .controller('barCodeManageDetailCtrl', barCodeManageDetailCtrl);
    barCodeManageDetailCtrl.$inject = ['$scope', 'barCodeManageDetailService', 'ngDialog', 'coreService'];

    /* @ngInject */
    function barCodeManageDetailCtrl($scope, barCodeManageDetailService, ngDialog, coreService) {
        var vm = this;
        var barCodeManageId = $scope.ngDialogData.barCodeManageId;
        vm.is_view = $scope.ngDialogData.is_view;
        //加载商品条形码详情
        var loadbarCodeManage = loadbarCodeManage;
        var setbarCodeManage = setbarCodeManage;
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
            barCodeManageDetailService.loadbarCodeManage(params)
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

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


    }
})();

