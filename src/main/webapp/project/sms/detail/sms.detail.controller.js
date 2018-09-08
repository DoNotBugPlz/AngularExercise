(function () {
    'use strict';

    angular
        .module('app.sms')
        .controller('smsDetailCtrl', smsDetailCtrl);

    smsDetailCtrl.$inject = ['localStorageService', '$scope', 'smsDetailService', 'ngDialog', 'coreService'];

    /* @ngInject */
    function smsDetailCtrl(localStorageService, $scope, smsDetailService, ngDialog, coreService) {
        var vm = this;
        var sms_id = $scope.ngDialogData.sms_id;
        vm.is_view = $scope.ngDialogData.is_view;
        vm.cancelOp = cancelOp;
        var loadSms = loadSms;
        var setSms = setSms;
        vm.saveSms = saveSms;
        vm.cancelOp = cancelOp;
        vm.openObjectTree = openObjectTree;

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }




        function setSms(response) {
            $("#username").val(response.data[0].chinaname);
            $("#addtime").val(response.data[0].addtime);
            $("#content").val(response.data[0].content);

        }

        function saveSms () {
            var params = {};
            params["t_sms"] = vm.t_sms;
            params["t_sms_object"] = vm.t_sms_object;
            smsDetailService.saveSms(params)
                .then(saveSmsSuccess)

        }

        function saveSmsSuccess(response) {
            vm.question = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();

        }

        function openObjectTree(title, params) {

            if (vm.is_view) {
                return;
            }
            title = '选择发送人';
            if (!params) {
                params = {};
            }
            if (vm.notice && vm.notice.notice_object) {
                params.notice_object = vm.notice.notice_object;
            } else {
                params.notice_object = "";
            }
            ngDialog.open({
                title: title,
                template: "office/object_tree/object_tree.html",
                height: '600px',
                width: '900px',
                controller: 'treeCtrl as vm',
                data: params,
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

        function backUsers(value) {
            console.log(value);
            if (!value) {
                return;
            }
            var user_ids, user_names,mobile;
            /* 获取返回结果 */
            angular.forEach(value, function (data, index, array) {

                if (data.isParent != true || data.isParent == 'f') {
                    if (!user_ids) {
                        user_ids = data.id;
                    } else {
                        // debugger;
                        user_ids += ',' + data.id;
                    }
                    if(!mobile){
                        mobile = data.mobile;
                    }else{
                        mobile += ',' + data.mobile;
                    }
                    if (!user_names) {
                        user_names = data.name;
                    } else {
                        user_names += ',' + data.name;
                    }
                }
            });

            if (vm.t_sms_object) {
             //   notice_object

                $("#username").val(user_names);
                vm.t_sms_object.reciver_id = user_names;
                vm.t_sms_object.reciver_id = user_ids;
            } else {
                $("#username").val(user_names);
                 vm.t_sms_object = {"reciver_id": user_names};
                 vm.t_sms_object.reciver_id = user_ids;
            }
            vm.reciver_id = user_ids;
            console.log("mobile=" + mobile);
            console.log("reciver_id=" + user_ids);
            console.log("user_names=" + user_names);
        }
        activate();
        function activate() {
            loadSms();
        }

        //加载详细信息
        function loadSms() {
            var params = {id: $scope.ngDialogData.sms_id};
            smsDetailService.loadSms(params)
                .then(setSms);
        }

    }
})();

