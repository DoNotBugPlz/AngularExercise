/**
 * Created by tr on 2018年8月17日17:03:59.
 */
(function () {
    'use strict';

    angular
        .module('app.category')
        .controller('CategoryValueDetailCtrl', CategoryValueDetailCtrl);

    CategoryValueDetailCtrl.$inject = ['$scope','_','ngDialog','SYSTEM','categoryValueDetailService'];
    function CategoryValueDetailCtrl($scope,_,ngDialog,SYSTEM,categoryValueDetailService) {
        var vm = this;
        vm.saveOp = saveOp; // 保存
        //vm.cancelOp = cancelOp; // 取消

        var type = $scope.ngDialogData.type;// 0:新增 1:修改
        var categoryValueId = $scope.ngDialogData.id;// 新增时为字典项ID，修改时为字典值ID

        var loadCategoryValueDetail = loadCategoryValueDetail;
        var setCategoryValueDetail = setCategoryValueDetail;

        function loadCategoryValueDetail() {
            if ('1' == type) {
                var params = {id: categoryValueId};
                categoryValueDetailService.loadSysCategoryValueDetail(params)
                    .then(setCategoryValueDetail)
            } else {
                vm.categoryValueInfo = {categoryid: categoryValueId};
            }
        }
        function setCategoryValueDetail(response) {
            vm.categoryValueInfo = response.data.sys_categoryvalue;
        }


        function saveOp() {
            var params = {id: vm.categoryValueInfo.id || '',
                categoryid: vm.categoryValueInfo.categoryid,
                parentid: vm.categoryValueInfo.parentid || '',
                refid: vm.categoryValueInfo.refid};
            window.angular.element(":input").blur();
            if ($scope.category_value_detail_form.$valid) {
                categoryValueDetailService.validCategoryValueRefid(params)
                    .then(function (response) {
                        if (!response.data || response.data.data == false)  {// 可用
                            var formParams = vm.categoryValueInfo;
                            formParams = _.mapKeys(formParams, function(value, key) {
                                return "sys_categoryvalue." + key;
                            });
                            categoryValueDetailService.addOrUpdateCategoryValue(formParams)
                                .then(function (response) {
                                    AppTools.successTips('保存成功！');
                                    var reData = {issave: true};
                                    ngDialog.close($scope.ngDialogId,reData);
                                })

                        } else {
                            AppTools.errorTips('字典编码已被占用，请重新填写！');
                        }
                    })
            } else {
                AppTools.errorTips("请完善信息！");
            }
        }


        function activate() {
            loadCategoryValueDetail();
        }
        activate();
    }
})();