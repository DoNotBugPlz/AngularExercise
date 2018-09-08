(function () {
    'use strict';

    angular
        .module('app.dataList')
        .controller('ShowViewCtrl', ShowViewCtrl);

    ShowViewCtrl.$inject = ['$scope', 'showViewService','pageInfDefault','ngDialog', 'coreService'];

    /* @ngInject */
    function ShowViewCtrl($scope, showViewService,pageInfDefault, ngDialog, coreService) {
        var vm = this;
        vm.source_param  = $scope.ngDialogData;
        vm.cancelDialog  = cancelDialog;
        var demoId = $scope.ngDialogData.demoId;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        function activate() {

        }
        activate();

        function cancelDialog() {
            ngDialog.close($scope.ngDialogId);
        }
    }
})();

