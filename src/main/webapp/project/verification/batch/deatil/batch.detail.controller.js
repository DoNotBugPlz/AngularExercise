(function () {
    'use strict';

    angular
        .module('app.batch')
        .controller('batchCtrl', batchCtrl);

    batchCtrl.$inject = ['localStorageService', '$scope', 'batchdetailservice', 'ngDialog', 'coreService'];

    /* @ngInject */
    function batchCtrl(localStorageService, $scope, batchdetailservice, ngDialog, coreService) {
        var vm = this;
        vm.is_view = $scope.ngDialogData.is_view;
        vm.cancelOp = cancelOp;
        var setVerification = setVerification;
        vm.saveBatch = saveBatch;
        vm.cancelOp = cancelOp;

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        function setVerification(response) {
            vm.batch =response.data.batch;
        }

        function saveBatch () {
            batchdetailservice.saveBatch(params)
                .then(savesaveBatchSuccess)
        }

        function savesaveBatchSuccess(response) {
            vm.question = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();
        }

        activate();
        function activate() {
        }

    }
})();

