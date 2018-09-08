(function () {
    'use strict';

    angular
        .module('app.masterplate')
        .controller('addGoodsCtrl', addGoodsCtrl);

    addGoodsCtrl.$inject = ['$scope', 'ngDialog', 'coreService', 'addGoodsService'];

    /* @ngInject */
    function addGoodsCtrl($scope, ngDialog, coreService, addGoodsService) {
        var vm = this;
        //父级页面传参
        vm.masterplate_class_id = $scope.ngDialogData.masterplate_class_id;
        //选择监测报表
        vm.choseTable = choseTable;

        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;

        function selectAll() {
            vm.allSelected = !vm.allSelected;
            if (!angular.isUndefined(vm.materialList)) {
                _.forEach(vm.materialList, function (item) {
                    item.selected = vm.allSelected;
                })

            }
        }

        function selectItem(item) {
            item.selected = !item.selected;
        }

        activate();

        ////////////////
        function activate() {
        }

        //选择监测报表
        function choseTable() {
            opMonitorTable("选择监测报表", {"masterplate_class_id": vm.masterplate_class_id});
        }

        //打开品种弹窗页
        function opMonitorTable(title, params) {
            ngDialog.open({
                title: title,
                template: "masterplate/monitorTable/monitor.table.html",
                height: '600px',
                width: '800px',
                controller: 'MonitorTableCtrl as vm',
                data: params,
                resolve: {
                    loadMaterialDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './masterplate/monitorTable/monitor.table.controller.js',
                            './masterplate/monitorTable/monitor.table.service.js',
                            'ng-zTree',
                            'chosen',
                            'mCustomScrollbar'
                        ]);
                    }
                },
                preCloseCallback: function () {
                }
            });
        }


        //关闭弹窗
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


    }
})();

