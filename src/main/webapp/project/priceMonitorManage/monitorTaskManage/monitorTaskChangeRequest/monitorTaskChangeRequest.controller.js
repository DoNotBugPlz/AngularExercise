(function () {
    'use strict';

    angular
        .module('app.monitorTaskChangeRequest')
        .controller('MonitorTaskChangeRequestController', MonitorTaskChangeRequestController);

    MonitorTaskChangeRequestController.$inject = ['localStorageService', '$scope', 'monitorTaskChangeRequestService', 'coreService', '$filter'];

    /* @ngInject */
    function MonitorTaskChangeRequestController(localStorageService, $scope, monitorTaskChangeRequestService, coreService, $filter) {
        var vm = this;
        // var monitorTaskChangeRequestId = $scope.ngDialogData.monitorTaskChangeRequestId;
        var userInf = localStorageService.get("currentUser");
        console.log(userInf);
        /**
         * 使用 当前用的登录信息进行展示
         * @type {$.fn.validatebox.defaults.rules.loginname|{validator, message}}
         */
        vm.userInf = userInf.loginname;
        vm.requestTime = $filter('date')(new Date(), 'yyyy-MM-HH');
        vm.unitName = userInf.unitName;
        vm.deptName = userInf.deptName;
        //暂存和提交按钮绑定方法
        vm.saveMonitorTaskChangeRequest = saveMonitorTaskChangeRequest;
        vm.saveAndSub = saveAndSub;
        //Textarea绑定
        // vm.monitorTaskChangeRequest = {};
        // $scope.description = "我是个天才";


        /**附件**/

        var fileInitOptions = {
            fileListTitle: "附件列表",
            opDetail: {
                editOpShow: true,//显示编辑
                deleteOpShow: true,//显示删除
                uploadOpShow: true//显示上传
            },
            tab_name: "t_monitorTaskChangeRequest",
            col_name: "upload",
            recordid: ""
        };
        var fileLoadOptions = {
            tab_name: "t_monitorTaskChangeRequest",
            col_name: "upload",
            recordid: ""
        };


        function activate() {
            coreService.getCategoryValues('YESNO,TABLE_TYPE,CLATTACHTYPE_1,POLITICALSTATUS,TYPEOFCHANGE')
                .then(setCategoryValues)
                .then(function () {
                    // if (!angular.isUndefined(monitorTaskChangeRequestId)){
                    //     loadMonitorTaskChangeRequest(monitorTaskChangeRequestId);
                    //     initFileOptions(monitorTaskChangeRequestId);
                    // }else{
                    initFileOptions(1);
                    loadChangeTask();
                    // }
                })

        }

        function initFileOptions(monitorTaskChangeRequestId) {
            fileInitOptions.recordid = monitorTaskChangeRequestId;
            fileLoadOptions.recordid = monitorTaskChangeRequestId;


            initFileList();
        }

        function initFileList() {
            vm.fileInitOptions = fileInitOptions;
            vm.fileLoadOptions = fileLoadOptions;

        }


        function setCategoryValues(response) {
            var result = response.data;
            // vm.yesnoCatagory= coreService.covertCategoryValueIdToInt(result["YESNO"]);
            vm.catagoryNum = coreService.covertCategoryValueIdToInt(result["TYPEOFCHANGE"]);
            // vm.catagoryMulti= result["CLATTACHTYPE_1"];
        }

        function loadMonitorTaskChangeRequest(monitorTaskChangeRequestId) {
            var params = {id: monitorTaskChangeRequestId};
            monitorTaskChangeRequestDetailService.loadMonitorTaskChangeRequest(params).then(setMonitorTaskChangeRequest);
        }

        function setMonitorTaskChangeRequest(response) {
            vm.monitorTaskChangeRequest = response.data;
            initFileOptions(vm.monitorTaskChangeRequest.id);
        }

        function saveMonitorTaskChangeRequest() {

            if ($scope.monitorTaskChangeRequest_form.$valid) {
                var params = vm.monitorTaskChangeRequest;
                monitorTaskChangeRequestDetailService.saveMonitorTaskChangeRequest(params)
                    .then(saveMonitorTaskChangeRequestSuccess)
            } else {
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }

        function saveMonitorTaskChangeRequestSuccess(response) {
            vm.monitorTaskChangeRequest = response.data;
            initFileOptions(vm.monitorTaskChangeRequest.id);
            AppTools.successTips("保存成功！");
            //cancelOp();
        }

        function saveAndSub() {
            ngDialog.close($scope.ngDialogId);
        }

        function loadChangeTask() {
            monitorTaskChangeRequestService.loadChangeTask().then(function (rep) {
                vm.loadChangeTask=rep.data;

            });
        }

        activate();

    }
})();

