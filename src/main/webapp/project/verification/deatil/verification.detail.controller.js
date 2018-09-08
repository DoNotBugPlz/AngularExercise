(function () {
    'use strict';

    angular
        .module('app.verification')
        .controller('verificationDetailCtrl', verificationDetailCtrl);

    verificationDetailCtrl.$inject = ['localStorageService', '$scope', 'verificationdetailservice', 'ngDialog', 'coreService'];

    /* @ngInject */
    function verificationDetailCtrl(localStorageService, $scope, verificationdetailservice, ngDialog, coreService) {
        var vm = this;
        var verification_id = $scope.ngDialogData.verification_id;
        vm.is_view = $scope.ngDialogData.is_view;
        vm.cancelOp = cancelOp;
        var loadverification = loadverification;
        var setVerification = setVerification;
        vm.saveVerification = saveVerification;
        vm.cancelOp = cancelOp;

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        function setVerification(response) {
            vm.Verification =response.data.Verification;
        }

        function saveVerification () {
            verificationdetailservice.saveVerification(params)
                .then(saveVerificationSuccess)
        }

        function saveVerificationSuccess(response) {
            vm.question = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();

        }

        activate();
        function activate() {
            loadverification();
        }
        //加载详细信息
        function loadverification() {
            var params = {id: $scope.ngDialogData.verification_id};
            verificationdetailservice.loadverification(params)
                .then(setVerification);
        }

    }
})();

