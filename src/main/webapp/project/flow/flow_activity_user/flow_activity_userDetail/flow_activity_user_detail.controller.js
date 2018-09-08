/**
 * Created by tr on 2018年8月7日10:26:41
 */
(function () {
    'use strict';
    angular
        .module('app.fau')
        .controller('fauDetailCtrl', fauDetailCtrl);

    fauDetailCtrl.$inject = ['$state','$scope', 'ngDialog', 'SYSTEM', 'fauDetailService','localStorageService','coreService']; // 初始化
    function fauDetailCtrl($state, $scope, ngDialog, SYSTEM, fauDetailService,localStorageService,coreService) {
        var vm = this;
        var flow_keys = $scope.ngDialogData.editInfo;
        var loadFauInfo = loadFauInfo;
        var setFauInfo = setFauInfo;
        vm.saveFauInfo = saveFauInfo;


        vm.cancelOp = cancelOp;
        vm.selectUserInfo = selectUserInfo;

        function activate() {
            vm.fau = {};
            vm.fau.def_process_key = flow_keys.flow_key; // 流程关键字
            vm.fau.def_activity_key = flow_keys.flow_step_key; // 流程步骤关键字
            loadFauInfo(flow_keys);
        }
        activate();

        function loadFauInfo(flow_keys) {
            var params = flow_keys;
            fauDetailService.loadFauInfo(params).then(function(response){
                setFauInfo(response)
            });
        }
        function setFauInfo(response) {
            if(response.data.id != null && response.data.id != "" && response.data.id != 'undefined'){
                vm.fau  = response.data;
            }
            vm.fau.def_process_key = flow_keys.flow_key; // 流程关键字
            vm.fau.def_activity_key = flow_keys.flow_step_key; // 流程步骤关键字
        }
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        function selectUserInfo() {
            if (vm.editFlag === 'view') {
                return;
            }
            var checkedInf = {is_one: false};
            selectUser(checkedInf, setUser)
        }

        /*设置人员*/
        function setUser(value) {
            if (value) {
                var user_ids, user_names;
                angular.forEach(value, function (data, index, array) {
                    if (!user_ids) {
                        user_ids = data.id;
                    } else {
                        user_ids += ',' + data.id;
                    }
                    if (!user_names) {
                        user_names = data.name;
                    } else {
                        user_names += ',' + data.name;
                    }
                });
                vm.fau.user_ids = user_ids;
                vm.fau.user_names = user_names;
            }
        }

        function selectUser(checkedInf, backUsers) {
            //选择人员弹框
            var title = '人员选择';
            ngDialog.open({
                title: title,
                template: "office/object_tree/object_tree.html",
                height: '600px',
                width: '1200px',
                controller: 'treeCtrl as vm',
                data: checkedInf,
                resolve: {
                    loadObjectTreeFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './office/object_tree/object_tree.controller.js',
                            './office/object_tree/object_tree.service.js',
                            'ng-zTree'
                        ]);
                    }
                },
                preCloseCallback: backUsers
            });
        }

        function saveFauInfo() {
            if ($scope.fau_form.$valid) {
                var params = vm.fau;
                fauDetailService.saveFauInfo(params)
                    .then(saveInfoSuccess)
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }
        }
        function saveInfoSuccess(response){
            vm.fau = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();
        }

        //刷新列表
        function refreshList() {

        }




       /* var loadFauInfo = loadFauInfo;
        vm.saveFauInfo = saveFauInfo;
        var setInof = setInof;
        vm.selectUserInfo = selectUserInfo;
        var setUser = setUser;
        var selectUser = selectUser;
        vm.cancelOp = cancelOp;


        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        function selectUserInfo() {
            if (vm.editFlag === 'view') {
                return;
            }
            var checkedInf = {is_one: false};
            selectUser(checkedInf, setUser)
        }

        /!** 设置人员 *!/
        function setUser(value) {
            if (value) {
                var user_ids, user_names;
                angular.forEach(value, function (data, index, array) {
                    if (!user_ids) {
                        user_ids = data.id;
                    } else {
                        user_ids += ',' + data.id;
                    }
                    if (!user_names) {
                        user_names = data.name;
                    } else {
                        user_names += ',' + data.name;
                    }
                });
                vm.fau.user_ids = user_ids;
                vm.fau.user_names = user_names;
            }
        }

        function selectUser(checkedInf, backUsers) {
            //选择人员弹框
            var title = '人员选择';
            ngDialog.open({
                title: title,
                template: "office/object_tree/object_tree.html",
                height: '600px',
                width: '1200px',
                controller: 'treeCtrl as vm',
                data: checkedInf,
                resolve: {
                    loadObjectTreeFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './office/object_tree/object_tree.controller.js',
                            './office/object_tree/object_tree.service.js',
                            'ng-zTree'
                        ]);
                    }
                },
                preCloseCallback: backUsers
            });
        }

        function activate() {
            coreService.getCategoryValues('CJ_USER_TYPE')
                .then(setCategoryValues)
                .then(function () {
                    vm.fau = {};
                    if(editInfo != null){
                        pkId =editInfo.id;
                        loadFauInfo(pkId)
                    }
                })
        }
        activate();

        function loadFauInfo(pkId) {
            var params = {id:pkId};
            fauDetailService.loadFauInfo(params).then(setInof);

        }

        function setInof(response){
            vm.fau = response.data;
        }


        function setCategoryValues(response) {
            var result = response.data;
            vm.userTypeCatagory= coreService.covertCategoryValueIdToInt(result["CJ_USER_TYPE"]);
        }

        function saveFauInfo() {
            if ($scope.fau_form.$valid) {
                var params = vm.fau;
                fauDetailService.saveFauInfo(params)
                    .then(saveInfoSuccess)
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }
        }

        function saveInfoSuccess(response){
            vm.fau = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();
        }

        function deleteFauInfo(obj) {
            delFauOp(obj.id);
        }
        function delFauOp(objIds) {
            if(angular.isUndefined(objIds)||objIds===''){
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？",function () {
                var params= {"ids":objIds};
                demoService.delDemoList(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }*/

    }

})();