/**
 * Created by tr on 2018年8月7日10:26:41
 */
(function () {
    'use strict';
    angular
        .module('app.lw')
        .controller('LwDetailCtrl', LwDetailCtrl);

    LwDetailCtrl.$inject = ['$state','$scope', 'ngDialog', 'SYSTEM', 'lwDetailService','localStorageService','coreService']; // 初始化
    function LwDetailCtrl($state, $scope, ngDialog, SYSTEM, lwDetailService,localStorageService,coreService) {
        var vm = this;



         var lwId = "";
         var editInfo = $scope.ngDialogData.editInfo;
         var loadLw = loadLw;
         var setLw = setLw;
         vm.saveLw = saveLw;

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
             tab_name:"oa_lw",
             col_name:"upload_zw",
             recordid:""
         }
         var fileZwLoadOptions ={
             tab_name:"oa_lw",
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
             tab_name:"oa_lw",
             col_name:"upload",
             recordid:""
         }
         var fileLoadOptions ={
             tab_name:"oa_lw",
             col_name:"upload",
             recordid:""
         }

         function initFileOptions(lwId) {
             fileZwInitOptions.recordid = lwId;
             fileZwLoadOptions.recordid = lwId;
             fileInitOptions.recordid = lwId;
             fileLoadOptions.recordid = lwId ;

             initFileList();
         }
         function initFileList() {
             vm.fileZwInitOptions= fileZwInitOptions;
             vm.fileZwLoadOptions= fileZwLoadOptions;
             vm.fileInitOptions= fileInitOptions;
             vm.fileLoadOptions= fileLoadOptions;

         }
         function activate() {
             coreService.getCategoryValues('FWEMERGENCY,FWOPENRANGE')
                 .then(setCategoryValues)
                 .then(function () {
                     if(editInfo != null){
                         lwId =editInfo.id;
                         if (!angular.isUndefined(lwId)){
                             loadLw(lwId);
                             initFileOptions(lwId);
                         }else{
                             initFileOptions("");
                         }
                     }

                 })
         }
         activate();

         function loadLw(fwId) {
             var params = {id:fwId};
             lwDetailService.loadLw(params).then(setLw);

         }

         function setLw(response){
             vm.lw = response.data;
             initFileOptions(vm.lw.id);
         }


         function setCategoryValues(response) {
             var result = response.data;
             vm.fwEmergencyCatagory= coreService.covertCategoryValueIdToInt(result["FWEMERGENCY"]);
             vm.fwOpenrangeCatagory= coreService.covertCategoryValueIdToInt(result["FWOPENRANGE"]);
         }

         function saveLw() {
             if ($scope.oa_lw_form.$valid) {
                 var params = vm.lw;
                 lwDetailService.saveLw(params)
                     .then(saveLwSuccess)
             }else{
                 AppTools.errorTips("请确保信息填写完整无误！")
             }
         }

         function saveLwSuccess(response){
             vm.lw = response.data;
             initFileOptions(vm.lw.id);
             AppTools.successTips("保存成功！");
         }

    }

})();