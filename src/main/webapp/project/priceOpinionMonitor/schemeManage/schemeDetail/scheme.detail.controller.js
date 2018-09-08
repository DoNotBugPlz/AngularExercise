(function () {
    'use strict';

    angular
        .module('app.schemeManage')
        .controller('SchemeDetailCtrl', SchemeDetailCtrl);

    SchemeDetailCtrl.$inject = ['$scope', 'SchemeDetailService','pageInfDefault','ngDialog', 'coreService'];

    /* @ngInject */
    function SchemeDetailCtrl($scope, SchemeDetailService,pageInfDefault, ngDialog, coreService) {
        var vm = this;
        vm.source_param  = $scope.ngDialogData;
        vm.cancelDialog  = cancelDialog;
        var demoId = $scope.ngDialogData.demoId;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        function activate() {
            vm.signList = [
                {chinaname:'肉类监控',site_name:"猪肉、上升、牛肉、下降",is_pub:"1"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:1,
                rows:[
                    {chinaname:'肉类监控',site_name:"猪肉、上升、牛肉、下降",is_pub:"1"}
                ]
            }
            vm.audit_man = '于次奥';
            vm.back_reason = '价格波动太大';
        }
        activate();


        function cancelDialog() {
            ngDialog.close($scope.ngDialogId);
        }
    }
})();

