(function () {
    'use strict';

    angular
        .module('app.helpFill')
        .controller('MonitorTableCtrl', MonitorTableCtrl);

    MonitorTableCtrl.$inject = ['localStorageService', '$scope', 'MonitorTableService', 'pageInfDefault','ngDialog', 'coreService'];

    /* @ngInject */
    function MonitorTableCtrl(localStorageService, $scope, MonitorTableService,pageInfDefault, ngDialog, coreService) {
        var vm = this;
        vm.cancelDialog  = cancelDialog;
        vm.source_param  = $scope.ngDialogData;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        function activate() {
            vm.signList = [
                {chinaname:'浦口区苏果超市',site_name:"苏果",col_datetime:'浦口',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'羽山路大润发超市',site_name:"大润发",col_datetime:'鼓楼',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"},
                {chinaname:'浦口区苏果超市',site_name:"苏果",col_datetime:'浦口',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'羽山路大润发超市',site_name:"大润发",col_datetime:'鼓楼',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"},
                {chinaname:'浦口区苏果超市',site_name:"苏果",col_datetime:'浦口',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'羽山路大润发超市',site_name:"大润发",col_datetime:'鼓楼',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"},
                {chinaname:'浦口区苏果超市',site_name:"苏果",col_datetime:'浦口',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'羽山路大润发超市',site_name:"大润发",col_datetime:'鼓楼',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"},
                {chinaname:'浦口区苏果超市',site_name:"苏果",col_datetime:'浦口',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'羽山路大润发超市',site_name:"大润发",col_datetime:'鼓楼',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"}
            ];

            vm.signList1 = [
                {chinaname:'浦口区苏果超市',site_name:"苏果",col_datetime:'浦口',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'羽山路大润发超市',site_name:"大润发",col_datetime:'鼓楼',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"},
                {chinaname:'浦口区苏果超市',site_name:"苏果",col_datetime:'浦口',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'羽山路大润发超市',site_name:"大润发",col_datetime:'鼓楼',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"}
            ];

            vm.signList2 = [{chinaname:'浦口区苏果超市',site_name:"苏果",col_datetime:'浦口',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'羽山路大润发超市',site_name:"大润发",col_datetime:'鼓楼',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"}
            ];

        }
        activate();
        function cancelDialog() {
            ngDialog.close($scope.ngDialogId);
        }
    }
})();

