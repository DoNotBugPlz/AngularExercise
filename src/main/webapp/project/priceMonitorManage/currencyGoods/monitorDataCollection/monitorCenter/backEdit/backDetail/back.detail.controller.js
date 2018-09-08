(function () {
    'use strict';

    angular
        .module('app.backEdit')
        .controller('BackDetailCtrl', BackDetailCtrl);

    BackDetailCtrl.$inject = ['$scope', 'BackDetailService', 'ngDialog', 'coreService'];

    /* @ngInject */
    function BackDetailCtrl($scope, BackDetailService, ngDialog, coreService) {
        var vm = this;
        vm.source_param  = $scope.ngDialogData;
        vm.cancelDialog  = cancelDialog;
        var demoId = $scope.ngDialogData.demoId;
        vm.readonly = $scope.ngDialogData.opType=="edit"?false:true;
        /**附件**/
        var fileInitOptions =  {
            fileListTitle:"附件列表",
            opDetail:{
                editOpShow:true,//显示编辑
                deleteOpShow:!vm.readonly,//显示删除
                uploadOpShow:!vm.readonly//显示上传
            },
            tab_name:"t_demo",
            col_name:"upload",
            recordid:""
        };
        var fileLoadOptions ={
            tab_name:"t_demo",
            col_name:"upload",
            recordid:""
        };
        window.bb = vm
        function activate() {
            vm.signList = [{chinaname:'白小麦',site_name:"一级",col_datetime:'元/500g',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'混合麦',site_name:"一级",col_datetime:'元/500g',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:2,
                rows:[{chinaname:'白小麦',site_name:"一级",col_datetime:'元/500g',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                    {chinaname:'混合麦',site_name:"一级",col_datetime:'元/500g',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"}
                ]
            }
            vm.audit_man = '于次奥';
            vm.back_reason = '价格波动太大';
            if (!angular.isUndefined(demoId)){
                initFileOptions(demoId);
            }else{
                initFileOptions("");
            }
        }
        activate();

        function initFileOptions(demoId) {
            fileInitOptions.recordid = demoId;
            fileLoadOptions.recordid = demoId;
            vm.fileInitOptions= fileInitOptions;
            vm.fileLoadOptions= fileLoadOptions;
        }

        function cancelDialog() {
            ngDialog.close($scope.ngDialogId);
        }
    }
})();

