/**
 * Created by tr on 2018年8月17日13:50:57.
 */
(function () {
    'use strict';

    angular
        .module('app.category')
        .controller('CategoryDetailCtrl', CategoryDetailCtrl);

    CategoryDetailCtrl.$inject = ['$state','$scope','$stateParams','ngDialog','_','coreService','categoryDetailService','SYSTEM'];
    function CategoryDetailCtrl($state,$scope,$stateParams,ngDialog,_,coreService,categoryDetailService,SYSTEM) {
        var vm = this;
        var categoryId = $scope.ngDialogData.categoryId; // 编辑页面传入信息ID
        var getCategoryDetail = getCategoryDetail; // 获取页面字典项下拉框
        var setAllCategory = setAllCategory;
        var setCategoryDetail = setCategoryDetail;
        vm.saveOp = saveOp; // 保存按钮
        vm.cancelOp = cancelOp;// 取消按钮

        function cancelOp() {
            var reData = {issave: false};
            ngDialog.close( $scope.ngDialogId,reData);
        }
        // 保存
        function saveOp() {
            var params = {
                constname: vm.categoryDetailInfo.constname, // 中文名
                categoryid: vm.categoryDetailInfo.id || '' // 字典主键ID
            };
            window.angular.element(":input").blur(); // 禁用页面所有输入框
            if ($scope.category_detail_form.$valid) { // 验证form表单
                categoryDetailService.validConstName(params)  // 验证常量标识是否重复
                    .then(function (response) {
                        if (response.data && response.data == 'true') {// 可用

                            var formParams = vm.categoryDetailInfo;
                            formParams = _.mapKeys(formParams, function(value, key) {
                                return "sys_category." + key;
                            });
                            categoryDetailService.addSysCategory(formParams)
                                .then(function (response) {
                                    AppTools.successTips('保存成功！');
                                    var reData = {issave: true};
                                    ngDialog.close($scope.ngDialogId,reData);
                                })

                        } else {
                            AppTools.errorTips('常量标识已被占用，请重新填写！');
                        }
                    })
            } else {
                AppTools.errorTips("请完善信息！");
            }
        }

        // 获取页面字典信息
        function getCategoryDetail() {
            if (null != categoryId && '' != categoryId) {
                var params = {id:categoryId};
                categoryDetailService.loadAllCategory()
                    .then(setAllCategory)
                    .then(categoryDetailService.loadCategoryDetail(params)
                        .then(setCategoryDetail));
            } else {
                categoryDetailService.loadAllCategory()
                    .then(setAllCategory)
                $scope.categoryDetailInfo = {};
            }
        }

        // 新增页面下拉框选项
        function setAllCategory(response) {
            $scope.allCategory = response.data;
        }
        // 加载编辑信息
        function setCategoryDetail(response) {
            var data = response.data;
            vm.categoryDetailInfo = data.sys_category;
        }
        function activate() {
            getCategoryDetail();
        }
        activate();



    }
})();