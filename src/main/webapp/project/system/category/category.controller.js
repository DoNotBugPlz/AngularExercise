/**
 * Created by tr on 2018/7/24.
 */
(function () {
    'use strict';

    angular
        .module('app.category')
        .controller('CategoryCtrl', CategoryCtrl);

    CategoryCtrl.$inject = ['$state','$scope','categoryService','pageInfDefault','ngDialog','_','coreService'];

    /* @ngInject */
    function CategoryCtrl($state,$scope,categoryService,pageInfDefault,ngDialog,_,coreService) {
        var vm = this;
        vm.loadCategoryList = loadCategoryList; // 字典项列表
        vm.deleteCategorys = deleteCategorys;// 禁用
        vm.undeleteCategorys = undeleteCategorys; // 启用
        vm.addOrUpdateCategory =  addOrUpdateCategory; // 新增、修改
        vm.loadCategoryValueList = loadCategoryValueList; // 查看子项

        // 获取分页信息
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault, // 初始页面
            pageSize:pageInfDefault.pageSizeDefault // 默认展示条数
        };

        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        function selectAll() {
            vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(vm.categoryList)){
                _.forEach(vm.categoryList,function (item) {
                    item.selected=vm.allSelected;
                })
            }
        }
        function selectItem(item) {
            item.selected=!item.selected;
        }

        // 0获取选中且未禁用的记录，1获取选中且已禁用的记录，为空或其他获取所有选中的记录
        function getAllSelectCategoryId(flag) {
            return _.map(_.filter(vm.categoryList,function (item) {
                if ('0' == flag || '1' == flag) {
                    return item.selected && item.delstatus == flag;
                }else {
                    return item.selected;
                }
            }),function (item) {
                return item.id;
            });
        }

        // 初始化列表
        function activate() {
            loadCategoryList();
        }
        activate();

        // 获取字典列表
        function loadCategoryList(pageNumber,pageSize) {
            // 分页信息
            var pageInf = {
                pageNumber:pageNumber||pageInfDefault.pageNumberDefault,
                pageSize:pageSize||pageInfDefault.pageSizeDefault,
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            categoryService.loadSysCategory(params)
                .then(function(response){
                    setCategoryList(response,params.pageNumber)
                });
        }

        // 列表字典项值转换 及分页信息
        function setCategoryList(response, pageNum) {
            // 获取列表数据
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
            vm.categoryList = result; // 列表信息数据
            vm.categoryListPage = angular.extend({pageTurn: 'loadCategoryList',pagenum:pageNum,pagesize:10}, data);
        }

        // 禁用按钮
        function deleteCategorys() {
            var selectIds = getAllSelectCategoryId(0).join(',');
            if (null == selectIds || selectIds.length < 1) {
                AppTools.infoTips("请选择要禁用的字典项！");
                return;
            }
            var params = {categoryids: selectIds};
            categoryService.deleteCategorys(params)
                .then(function (response) {
                    AppTools.successTips("禁用成功！");
                    refreshList();
                })
        }

        // 启用
        function undeleteCategorys() {
            var selectIds = getAllSelectCategoryId(1).join(',');
            if (null == selectIds || selectIds.length < 1) {
                AppTools.infoTips("请选择要启用的字典项！");
                return;
            }
            var params = {categoryids: selectIds};
            categoryService.undeleteCategorys(params)
                .then(function (response) {
                    AppTools.successTips("启用成功！");
                    refreshList();
                })
        }

        // 0：新增 1：编辑
        function addOrUpdateCategory(type, id) {
            var title = '0' == type ? '新增字典项' : '修改字典项';
            ngDialog.open({
                title: title,
                template:"./system/category/categoryDetail/category_detail.html",
                height:'500px',
                width:'870px',
                controller:'CategoryDetailCtrl as vm',
                data: {categoryId: id},
                resolve: {
                    loadCategoryDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './system/category/categoryDetail/category_detail.controller.js',
                            './system/category/categoryDetail/category_detail.service.js',
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

        // 查看子项
        function loadCategoryValueList(id,name) {
            $state.go('categoryValue', {categoryId:id,categoryName:name});
        }


        //刷新页面列表
        function refreshList() {
            loadCategoryList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize);
        }
        refreshList();
        
        
        
        
        
        
        
    }
})();