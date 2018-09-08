(function () {
    'use strict';

    angular
        .module('app.monitorTableQuery')
        .controller('MonitorTableQueryDetailCtrl', MonitorTableQueryDetailCtrl);

    MonitorTableQueryDetailCtrl.$inject = ['localStorageService','$scope','monitorTableQueryDetailService','ngDialog','coreService'];

    /* @ngInject */
    function MonitorTableQueryDetailCtrl(localStorageService,$scope,monitorTableQueryDetailService,ngDialog,coreService) {
        var vm = this;
        var monitorTableQueryId = $scope.ngDialogData.monitorTableQueryId;
        var loadMonitorTableQuery = loadMonitorTableQuery;
        var setMonitorTableQuery = setMonitorTableQuery;
        vm.saveMonitorTableQuery = saveMonitorTableQuery;
        vm.cancelOp = cancelOp;
        vm.readonly = $scope.ngDialogData.opType=="edit"?false:true;

        /**附件**/
        var fileZwInitOptions =  {
            /*showOp:true,*/
            opDetail:{
                editOpShow:!vm.readonly,//显示编辑
                deleteOpShow:!vm.readonly,//显示删除
                uploadOpShow:!vm.readonly//显示上传
                // downLoadOpShow:true,//显示下载
                // viewOpShow:true//显示预览
            },
            fileListTitle:"正文列表",
            tab_name:"t_monitorTableQuery",
            col_name:"upload_zw",
            recordid:""
        }
        var fileZwLoadOptions ={
            tab_name:"t_monitorTableQuery",
            col_name:"upload_zw",
            recordid:""
        }
        var fileInitOptions =  {
            fileListTitle:"附件列表",
            opDetail:{
                editOpShow:!vm.readonly,//显示编辑
                deleteOpShow:!vm.readonly,//显示删除
                uploadOpShow:!vm.readonly//显示上传
            },
            tab_name:"t_monitorTableQuery",
            col_name:"upload",
            recordid:""
        }
        var fileLoadOptions ={
            tab_name:"t_monitorTableQuery",
            col_name:"upload",
            recordid:""
        }

        function activate() {
            coreService.getCategoryValues('YESNO,TABLE_TYPE,CLATTACHTYPE_1,POLITICALSTATUS')
                .then(setCategoryValues)
                .then(function () {
                    if (!angular.isUndefined(monitorTableQueryId)){
                        loadMonitorTableQuery(monitorTableQueryId);
                        initFileOptions(monitorTableQueryId);
                    }else{
                        initFileOptions("");
                    }
                })
        }
        function initFileOptions(monitorTableQueryId) {
            fileZwInitOptions.recordid = monitorTableQueryId;
            fileZwLoadOptions.recordid = monitorTableQueryId;
            fileInitOptions.recordid = monitorTableQueryId;
            fileLoadOptions.recordid = monitorTableQueryId;

            initFileList();
        }
        function initFileList() {
            vm.fileZwInitOptions= fileZwInitOptions;


            vm.fileZwLoadOptions= fileZwLoadOptions;
            vm.fileInitOptions= fileInitOptions;
            vm.fileLoadOptions= fileLoadOptions;

        }


        function setCategoryValues(response) {
            var result = response.data;
            vm.yesnoCatagory= coreService.covertCategoryValueIdToInt(result["YESNO"]);
            vm.catagoryNum= coreService.covertCategoryValueIdToInt(result["TABLE_TYPE"]);
            vm.catagoryMulti= result["CLATTACHTYPE_1"];
            vm.catagoryStr= result["POLITICALSTATUS"];
        }
        function loadMonitorTableQuery(monitorTableQueryId){
            var params = {id:monitorTableQueryId};
            monitorTableQueryDetailService.loadMonitorTableQuery(params).then(setMonitorTableQuery);
        }

        function setMonitorTableQuery(response){
            vm.monitorTableQuery = response.data;
            initFileOptions(vm.monitorTableQuery.id);
        }
        function saveMonitorTableQuery() {

            if ($scope.monitorTableQuery_form.$valid) {
                var params = vm.monitorTableQuery;
                monitorTableQueryDetailService.saveMonitorTableQuery(params)
                    .then(saveMonitorTableQuerySuccess)
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }
        function saveMonitorTableQuerySuccess(response){
            vm.monitorTableQuery = response.data;
            initFileOptions(vm.monitorTableQuery.id);
            AppTools.successTips("保存成功！");
            //cancelOp();
        }
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        activate();

    }
})();

