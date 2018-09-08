(function () {
    'use strict';

    angular
        .module('app.material')
        .controller('materialDetailCtrl', MaterialDetailCtrl);

    MaterialDetailCtrl.$inject = ['$scope', 'ngDialog', 'coreService', 'materialDetailService'];

    /* @ngInject */
    function MaterialDetailCtrl($scope, ngDialog, coreService, materialDetailService) {
        var vm = this;
        //父级页面传参--数据id
        var materialId = $scope.ngDialogData.materialId;
        //父级页面传参
        vm.is_view = $scope.ngDialogData.is_view;
        vm.is_updata = $scope.ngDialogData.is_updata;
        //加载详细信息
        var loadMaterial = loadMaterial;
        //关闭弹窗页
        vm.cancelOp = cancelOp;
        //保存详细信息
        vm.saveMaterial = saveMaterial;
        //加载子级字典项
        vm.clattachtypeOp = clattachtypeOp;
        //选择人员单位
        vm.selectDept = selectDept;
        activate();

        ////////////////
        function activate() {
            coreService.getCategoryValues('CLATTACHTYPE')
                .then(setCategoryValues)
                .then(function () {
                    if (!angular.isUndefined(materialId)) {
                        loadMaterial(materialId);
                    }
                });

        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.clattachtypeCatagory = coreService.covertCategoryValueIdToInt(result["CLATTACHTYPE"]);

        }


        //父级字典项改变事件
        function clattachtypeOp() {
            if (vm.material.clattachtype) {
                coreService.getCategoryValues('CLATTACHTYPE' + '_' + vm.material.clattachtype)
                    .then(setSubCategoryValues)
            }
        }

        function setSubCategoryValues(response) {
            var result = response.data;
            vm.clattach_sub_typeCatagory = coreService.covertCategoryValueIdToInt(result['CLATTACHTYPE' + '_' + vm.material.clattachtype]);
        }

        //加载单位树
        function selectDept(title, params) {
            if (vm.is_view) {
                return;
            }
            title = '选择人员单位';
            if (!params) {
                params = {};
            }
            if (vm.material && vm.material.write_user_unitid) {
                params.write_user_unitid = vm.material.write_user_unitid;
            } else {
                params.write_user_unitid = "";
            }
            ngDialog.open({
                title: title,
                template: "material/dept_tree/dept_tree.html",
                height: '500px',
                width: '320px',
                controller: 'treeCtrl as vm',
                data: params,
                resolve: {
                    loadDeptTreeFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './material/dept_tree/dept_tree.controller.js',
                            './material/dept_tree/dept_tree.service.js',
                            'ng-zTree'
                        ]);
                    }
                },
                preCloseCallback: chooseNode
            });
        }

        function chooseNode(treeNode) {
            if (!treeNode) {
                return;
            }
            if (vm.material) {
                vm.material.write_user_unitname = treeNode.name;
                vm.material.write_user_unitid = treeNode.id;
            } else {
                vm.material = {"write_user_unitname": treeNode.name};
                vm.material = {"write_user_unitid": treeNode.id};
                vm.material.write_user_unitname = treeNode.name;
                vm.material.write_user_unitid = treeNode.id;
            }
        }

        //加载详细信息
        function loadMaterial(materialId) {
            var params = {id: materialId};
            materialDetailService.loadMaterial(params)
                .then(setMaterial);
        }

        function setMaterial(response) {
            vm.material = response.data;
            if (vm.is_view || vm.is_updata) {
                clattachtypeOp();
            }
        }

        //保存
        function saveMaterial(status) {
            if ($scope.material_form.$valid) {
                vm.material.clattachstatus = status;
                materialDetailService.saveMaterial(vm.material)
                    .then(saveMaterialSuccess)
            } else {
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }

        function saveMaterialSuccess(response) {
            vm.material = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();
        }

        //关闭弹窗
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


    }
})();

