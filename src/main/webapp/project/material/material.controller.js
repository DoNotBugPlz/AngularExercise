/**
 * Created by xmr on 2018年8月13日 19:14:26
 */
(function () {
    'use strict';
    angular
        .module('app.material')
        .controller('MaterialCtrl', MaterialCtrl);
    MaterialCtrl.$inject = ['$scope', '$stateParams', 'materialService', 'coreService', 'pageInfDefault', 'ngDialog', '_'];

    /* @ngInject */
    function MaterialCtrl($scope, $stateParams, materialService, coreService, pageInfDefault, ngDialog, _) {
        var vm = this;
        window.a = vm;
        //加载数据列表
        vm.loadMaterialList = loadMaterialList;
        //重置
        vm.reset = reset;
        //新增
        vm.addMaterial = addMaterial;
        //查看
        vm.viewMaterial = viewMaterial;
        //修改
        vm.editMaterial = editMaterial;
        //删除
        vm.deleteMaterial = deleteMaterial;
        //批量删除
        vm.delMaterialPl = delMaterialPl;


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


        /*****/
        var setMaterialList = setMaterialList;
        var refreshList = refreshList;
        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };

        activate();

        ////////////////
        function activate() {
            //加载数据列表
            loadMaterialList();
            //加载字典项
            coreService.getCategoryValues('CLATTACHSTATUS')
                .then(setCategoryValues);
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.clattachstatusCatagory = coreService.covertCategoryValueIdToInt(result["CLATTACHSTATUS"]);
        }

        //重置
        function reset() {
            vm.searchParams = {};
        }

        //加载数据列表
        function loadMaterialList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            materialService.loadMaterialList(params)
                .then(function (response) {
                    setMaterialList(response, params.pageNumber)
                });
        }

        //新增
        function addMaterial() {
            opMaterial("新增监测材料", {});
        }

        //查看
        function viewMaterial(material) {
            opMaterial("查看监测材料", {"materialId": material.id, "is_view": true});
        }

        //修改
        function editMaterial(material) {
            opMaterial("修改监测材料", {"materialId": material.id, "is_updata": true});
        }

        //打开详情页
        function opMaterial(title, params) {
            ngDialog.open({
                title: title,
                template: "material/detail/material.detail.html",
                height: '600px',
                width: '1000px',
                controller: 'materialDetailCtrl as vm',
                data: params,
                resolve: {
                    loadMaterialDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './material/detail/material.detail.controller.js',
                            './material/detail/material.detail.service.js',
                            'ng-zTree',
                            'chosen',
                            'My97DatePicker'
                        ]);
                    }
                },
                preCloseCallback: function () {
                    refreshList();
                }
            });
        }

        //删除
        function deleteMaterial(material) {
            var materialIds = material.id;
            if (angular.isUndefined(materialIds) || materialIds === '') {
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？", function () {
                var params = {"material_ids": materialIds};
                materialService.deleteMaterialList(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }

        //批量删除
        function delMaterialPl() {
            deleteMaterial({"id": getAllSelectId().join(",")});
        }

        function getAllSelectId() {
            return _.map(_.filter(vm.materialList, function (item) {
                return item.selected;
            }), function (item) {
                return item.id;
            });
        }

        //刷新列表
        function refreshList() {
            loadMaterialList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }

        function setMaterialList(response, pageNum) {
            var result = response.data;
            vm.materialList = result.rows;
            vm.materialListPage = angular.extend({pageTurn: 'loadMaterialList', pagenum: pageNum}, result);
        }

    }

})();

