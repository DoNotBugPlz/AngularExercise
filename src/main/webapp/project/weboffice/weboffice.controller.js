(function () {
    'use strict';

    angular
        .module('app.webOffice')
        .controller('webOfficeCtrl', webOfficeCtrl);

    webOfficeCtrl.$inject = ['$scope','ngDialog','webOfficeService','WEB_OFFICE_CONFIG'];

    /* @ngInject */
    function webOfficeCtrl($scope,ngDialog,webOfficeService,WEB_OFFICE_CONFIG) {
        var vm = this;
        /**
         *  officeInf
         *  {
         *      loadDocumentActionPath ："",//使用自己的加载office 的url 可以不传
         *      createNew:false|true,
         *      editAble:false|true,
         *      officeId:"",
         *      tab_name:"",
         *      col_name:"",
         *      recordId:"",
         *      fileName:"", //文件名称
         *      opDetail:{//操作显示详情
         *      }
         *  }
         * @type {*|{}}
         */
        var officeInf = $scope.ngDialogData;
        vm.currentFileid = officeInf.officeId;
        vm.currentFileName = officeInf.fileName;
        vm.saveOfficeWithFileName = saveOfficeWithFileName;
        vm.officeButton = {
            editAble : officeInf.editAble
        };
        var initWebOffice = initWebOffice;
        active();
        function active(){
            initWebOffice();
            // if(officeInf.officeId&&officeInf.editAble){
            //    var params = {fileid:officeInf.officeId};
            //    webOfficeService.loadAttachFile(params).then(function (response) {
            //        var data = response.data;
            //    });
            // }
        }
        vm.saveWebOffice = saveWebOffice;
        function initWebOffice(){
            vm.NTKOWebOffice_OnSaveToURL=function (re) {
                var data = angular.fromJson(re.target);
                if(data.iserror){
                    AppTools.errorTips("保存失败！");
                }else {
                    var obj = data.data[0];
                    vm.currentFileid = obj.id;
                    vm.currentFileName = obj.filename;
                    AppTools.successTips("保存成功！");
                }
            };
            vm.NTKOWebOffice_AfterOpenFromURL=function () {
                AppTools.successTips("加载成功！");
            };
            //注册加载office回调事件
            EventBus.addEventListener('NTKOWebOffice_AfterOpenFromURL', vm.NTKOWebOffice_AfterOpenFromURL);
            EventBus.addEventListener('NTKOWebOffice_OnSaveToURL', vm.NTKOWebOffice_OnSaveToURL);
            $scope.$on('$destroy', function () {
                //销毁注册的事件
                EventBus.removeEventListener('NTKOWebOffice_AfterOpenFromURL',vm.NTKOWebOffice_AfterOpenFromURL);
                EventBus.removeEventListener('NTKOWebOffice_OnSaveToURL',vm.NTKOWebOffice_OnSaveToURL);
            });
            //打开office
            vm.officeInf = officeInf;
        }
        var fileNameNgDialogId="";

        function saveWebOffice(){
            if(vm.currentFileName){
                //提示输入文件名称
                ngDialog.open({  //实例化，方便使用close()方法
                    title:"输入文件名称",
                    template: 'webOfficeFileNameDiv',
                    width:'600px',
                    height:'120px',
                    top:"0px",
                    controller:function($scope){
                        fileNameNgDialogId=$scope.ngDialogId;
                    },
                    scope: $scope
                });
            }else{
                saveOffice();
            }
        }
        function saveOffice() {
            var opt = {
                fileName:vm.currentFileName,
                postData:"tablename="+officeInf.tab_name+"&colname="+officeInf.col_name+"&recordid="+officeInf.recordId+"&fileId=" + vm.currentFileid
            }
            var redate = webOfficeService.saveWebOfficeToURL(opt);
            if(WEB_OFFICE_CONFIG.browserMatch.browser=="IE"){//IE下需要手动调用
                EventBus.dispatch('NTKOWebOffice_OnSaveToURL',redate);
            }
        }

        function saveOfficeWithFileName() {
            if (vm.filename_form.$valid) {
                if(!vm.currentFileName.endWith(".doc")||!vm.currentFileName.endWith(".docx")){
                    vm.currentFileName+=".doc";
                }
                saveOffice();
                ngDialog.close(fileNameNgDialogId);
            }else{
                AppTools.errorTips("请确保信息填写完整无误！")
            }
        }
        //以什么结尾
        String.prototype.endWith = function (endStr){
            var d=this.length-endStr.length;
            return (d>=0&&this.lastIndexOf(endStr)==d)
        }


    }
})();

