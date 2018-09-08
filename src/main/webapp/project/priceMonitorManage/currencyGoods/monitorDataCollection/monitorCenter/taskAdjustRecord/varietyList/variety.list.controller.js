(function () {
    'use strict';

    angular
        .module('app.taskAdjustRecord')
        .controller('VarietyListCtrl', VarietyListCtrl);

    VarietyListCtrl.$inject = ['localStorageService', '$scope', 'VarietyListService','pageInfDefault', 'ngDialog', 'coreService'];

    /* @ngInject */
    function VarietyListCtrl(localStorageService, $scope, VarietyListService,pageInfDefault, ngDialog, coreService) {
        var vm = this;
        vm.cancelDialog  = cancelDialog;
        vm.source_param  = $scope.ngDialogData;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        function activate() {
            vm.signList = [{chinaname:'白小麦',site_name:"一级",col_datetime:'元/500g',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                {chinaname:'混合麦',site_name:"一级",col_datetime:'元/500g',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:2,
                rows:[{chinaname:'白小麦',site_name:"一级",col_datetime:'元/500g',actual_sign_nums:'私营',is_pub_text:"超市",is_pub:"1"},
                    {chinaname:'混合麦',site_name:"一级",col_datetime:'元/500g',actual_sign_nums:'直报',is_pub_text:"超市",is_pub:"0"}
                ]
            }
        }
        activate();
        function cancelDialog() {
            ngDialog.close($scope.ngDialogId);
        }
    }
})();

