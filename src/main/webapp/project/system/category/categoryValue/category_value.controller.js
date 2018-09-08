/**
 * Created by tr on 2018/7/24.
 */
(function () {
    'use strict';

    angular
        .module('app.category')
        .controller('CategoryValueCtrl', CategoryValueCtrl);

    CategoryValueCtrl.$inject = ['$state','$stateParams','$scope','categoryValueService','ngDialog','_','coreService'];
    function CategoryValueCtrl($state,$stateParams,$scope,categoryValueService,ngDialog,_,coreService) {
        var vm = this;
        var categoryId = $stateParams.categoryId; // 字典信息ID
        vm.categoryName = $stateParams.categoryName; // 字典信息名称
        vm.deleteCategoryValues = deleteCategoryValues; //禁用
        vm.undeleteCategoryValues = undeleteCategoryValues; // 启用
        vm.addOrUpdateCategoryValue = addOrUpdateCategoryValue;// 新增或修改

        var loadCategoryValueList = loadCategoryValueList; // 加载子项信息列表

        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        function selectAll() {
            vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(vm.categoryValueList)){
                _.forEach(vm.categoryValueList,function (item) {
                    item.selected=vm.allSelected;
                })
            }
        }
        function selectItem(item) {
            item.selected=!item.selected;
        }

        // 获取字典子项列表
        function loadCategoryValueList() {
            var params = {id: categoryId, type:'category'};
            categoryValueService.loadSysCategoryValueList(params)
                .then(setCategoryValue)
        }
        function setCategoryValue(response) {
            var data = response.data;
            var result = data.rows;
            // 转换字典值
            coreService.getCategoryValues("YESNO")
                .then(function (response) {
                    var yesnoCatagory = response.data["YESNO"];
                    _.forEach(result,function (item) {
                        _.forEach(yesnoCatagory,function (category) {
                            if (category.id == item.delstatus) {
                                item.delText = category.chinaname;
                            }
                        })
                    });
                })
            vm.allSelected = false;
            vm.categoryValueList = result;
        }

        // 0获取选中且未禁用的记录，1获取选中且已禁用的记录，为空或其他获取所有选中的记录
        function getAllSelectId(flag) {
            return _.map(_.filter(vm.categoryValueList,function (item) {
                if ('0' == flag) {
                    return item.selected && item.delstatus == 0;
                } else if ('1' == flag) {
                    return item.selected && item.delstatus == 1;
                } else {
                    return item.selected;
                }
            }),function (item) {
                return item.id;
            });
        }

        // 禁用
        function deleteCategoryValues() {
            var selectIds = getAllSelectId(0).join(',');
            if (null == selectIds || selectIds.length < 1) {
                AppTools.infoTips("请选择要禁用的字典子项！");
                return;
            }
            var params = {categoryvalueids: selectIds};
            categoryValueService.deleteCategoryValues(params)
                .then(function (response) {
                    if (!response.data.iserror) {
                        AppTools.successTips("禁用成功！");
                        refreshList();
                    } else {
                        AppTools.errorTips("操作失败！");
                    }
                })
        }

        // 启用
        function undeleteCategoryValues() {
            var selectIds = getAllSelectId(1).join(',');
            if (null == selectIds || selectIds.length < 1) {
                AppTools.infoTips("请选择要启用的字典子项！");
                return;
            }
            var params = {categoryvalueids: selectIds};
            categoryValueService.undeleteCategoryValues(params)
                .then(function (response) {
                    if (!response.data.iserror) {
                        AppTools.successTips("启用成功！");
                        refreshList();
                    } else {
                        AppTools.errorTips("操作失败！");
                    }
                })
        }

        // 0新增 1编辑字典子项
        function addOrUpdateCategoryValue(type, id) {
            var title = '';
            var params = {type: type};
            if ('0' == type) {
                title = '新增字典子项';
                params.id = categoryId;
            } else if ('1' == type) {
                title = '修改字典子项';
                params.id = id;
            }
            ngDialog.open({
                title: title,
                template:"./system/category/categoryValueDetail/category_value_detail.html",
                height:'300px',
                width:'700px',
                controller:'CategoryValueDetailCtrl as vm',
                data: params,
                resolve: {
                    loadSysCategoryDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './system/category/categoryValueDetail/category_value_detail.controller.js',
                            './system/category/categoryValueDetail/category_value_detail.service.js',
                            './utils/app.validate.js'
                        ]);
                    }
                },
                preCloseCallback: function (value) {
                    var issave = value.issave;// 保存后刷新列表
                    if (issave) {
                        refreshList();
                    }
                }
            });
        }



        // 初始化界面
        function activate() {
            loadCategoryValueList();
        }
        activate();

        // 刷新界面
        function refreshList() {
            loadCategoryValueList();
        }
    }
})();