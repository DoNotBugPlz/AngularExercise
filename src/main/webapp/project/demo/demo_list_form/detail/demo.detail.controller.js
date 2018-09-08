(function () {
    'use strict';

    angular
        .module('app.demo')
        .controller('DemoDetailCtrl', DemoDetailCtrl);

    DemoDetailCtrl.$inject = ['localStorageService','$scope','demoDetailService','ngDialog','coreService'];

    /* @ngInject */
    function DemoDetailCtrl(localStorageService,$scope,demoDetailService,ngDialog,coreService) {
        var vm = this;
        var demoId = $scope.ngDialogData.demoId;
        var loadDemo = loadDemo;
        var setDemo = setDemo;
        vm.saveDemo = saveDemo;
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
            tab_name:"t_demo",
            col_name:"upload_zw",
            recordid:""
        }
        var fileZwLoadOptions ={
            tab_name:"t_demo",
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
            tab_name:"t_demo",
            col_name:"upload",
            recordid:""
        }
        var fileLoadOptions ={
            tab_name:"t_demo",
            col_name:"upload",
            recordid:""
        }

        function activate() {
            coreService.getCategoryValues('YESNO,TABLE_TYPE,CLATTACHTYPE_1,POLITICALSTATUS')
                .then(setCategoryValues)
                .then(function () {
                    if (!angular.isUndefined(demoId)){
                        loadDemo(demoId);
                        initFileOptions(demoId);
                    }else{
                        initFileOptions("");
                    }
                })
        }
        function initFileOptions(demoId) {
            fileZwInitOptions.recordid = demoId;
            fileZwLoadOptions.recordid = demoId;
            fileInitOptions.recordid = demoId;
            fileLoadOptions.recordid = demoId;

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
        function loadDemo(demoId){
            var params = {id:demoId};
            demoDetailService.loadDemo(params).then(setDemo);
        }

        function setDemo(response){
            vm.demo = response.data;
            initFileOptions(vm.demo.id);
        }
        function saveDemo() {

            if ($scope.demo_form.$valid) {
                var params = vm.demo;
                console.log(vm.demo);
                demoDetailService.saveDemo(params)
                    .then(saveDemoSuccess)
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }
        function saveDemoSuccess(response){
            vm.demo = response.data;
            initFileOptions(vm.demo.id);
            AppTools.successTips("保存成功！");
            //cancelOp();
        }
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        activate();

    }
})();

