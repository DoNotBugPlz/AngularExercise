/**
 * Created by tr on 2018年8月7日10:26:41
 */
(function () {
    'use strict';
    angular
        .module('app.fw')
        .controller('FwDetailCtrl', FwDetailCtrl);

    FwDetailCtrl.$inject = ['$state','$scope', 'ngDialog', 'SYSTEM', 'fwDetailService','localStorageService','coreService']; // 初始化
    function FwDetailCtrl($state, $scope, ngDialog, SYSTEM, fwDetailService,localStorageService,coreService) {
        var vm = this;

        var fwId = "";
        var editInfo = $scope.ngDialogData.editInfo;
        var loadFw = loadFw;
        var setFw = setFw;
        vm.saveFw = saveFw;

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
            tab_name:"oa_fw",
            col_name:"upload_zw",
            recordid:""
        }
        var fileZwLoadOptions ={
            tab_name:"oa_fw",
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
            tab_name:"oa_fw",
            col_name:"upload",
            recordid:""
        }
        var fileLoadOptions ={
            tab_name:"oa_fw",
            col_name:"upload",
            recordid:""
        }

        function initFileOptions(fwId) {
            fileZwInitOptions.recordid = fwId;
            fileZwLoadOptions.recordid = fwId;
            fileInitOptions.recordid = fwId;
            fileLoadOptions.recordid = fwId ;

            initFileList();
        }
        function initFileList() {
            vm.fileZwInitOptions= fileZwInitOptions;
            vm.fileZwLoadOptions= fileZwLoadOptions;
            vm.fileInitOptions= fileInitOptions;
            vm.fileLoadOptions= fileLoadOptions;

        }


        function activate() {
            coreService.getCategoryValues('FWFILETYPE,FWEMERGENCY,FWOPENRANGE')
                .then(setCategoryValues)
                .then(function () {
                    debugger;
                    if(editInfo != null){
                        fwId =editInfo.id;
                        if (!angular.isUndefined(fwId)){
                            loadFw(fwId);
                            initFileOptions(fwId);
                        }else{
                            initFileOptions("");
                        }
                    }

                })
        }
        activate();
        
        function loadFw(fwId) {
            var params = {id:fwId};
            fwDetailService.loadFw(params).then(setFw);

        }

        function setFw(response){
            vm.fw = response.data;
            initFileOptions(vm.fw.id);
        }


        function setCategoryValues(response) {
            var result = response.data;
            vm.fwFileTypeCatagory= coreService.covertCategoryValueIdToInt(result["FWFILETYPE"]);
            vm.fwEmergencyCatagory= coreService.covertCategoryValueIdToInt(result["FWEMERGENCY"]);
            vm.fwOpenrangeCatagory= coreService.covertCategoryValueIdToInt(result["FWOPENRANGE"]);
        }

        function saveFw() {
            alert(1);
            if ($scope.oa_fw_form.$valid) {
                var params = vm.fw;
                fwDetailService.saveFw(params)
                    .then(saveFwSuccess)
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }
        }

        function saveFwSuccess(response){
            vm.fw = response.data;
            initFileOptions(vm.fw.id);
            AppTools.successTips("保存成功！");
        }

    }

})();