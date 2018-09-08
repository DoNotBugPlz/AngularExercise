(function () {
    'use strict';

    angular
        .module('app.masterplate')
        .controller('addTrendCtrl', addTrendCtrl);

    addTrendCtrl.$inject = ['$scope', 'ngDialog', 'coreService', 'addTrendService'];

    /* @ngInject */
    function addTrendCtrl($scope, ngDialog, coreService, addTrendService) {
        var vm = this;
        //父级页面传参
        vm.parentId = $scope.ngDialogData.id;
        vm.name = $scope.ngDialogData.name;
        vm.childrenList = $scope.ngDialogData.childrenList || [];
        //添加走势
        vm.addTrendInput = addTrendInput;
        //删除走势
        vm.delTrendInput = delTrendInput;
        //保存
        vm.saveTrend = saveTrend;

        activate();

        ////////////////
        function activate() {
        }

        //添加走势
        function addTrendInput() {
            vm.childrenList.push({"id": "", "name": "", "is_parent": 0, "parent_id": vm.parentId});
        }

        //删除走势
        function delTrendInput(obj) {
            _.remove(vm.childrenList, obj);
        }

        //保存
        function saveTrend() {
            if ($scope.trend_form.$valid) {
                if (vm.parentId) {
                    var params = {};
                    var parent = {"id": vm.parentId};
                    params["t_masterplate_index"] = parent;
                    params["t_masterplate_indexList"] = vm.childrenList;
                    addTrendService.editTrend(params)
                        .then(saveSuccess)
                } else {
                    var parent = {"name": vm.name, "is_parent": 1};
                    var params = {};
                    params["t_masterplate_index"] = parent;
                    params["t_masterplate_indexList"] = vm.childrenList;
                    addTrendService.saveTrend(params)
                        .then(saveSuccess)
                }
            } else {
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }

        function saveSuccess(response) {
            vm.parentId = response.data.id;
            AppTools.successTips("保存成功！");
            cancelOp();
        }

        //关闭弹窗
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


    }
})();

