(function () {
    'use strict';

    angular
        .module('app.reviewed')
        .controller('reviewedDetailCtrl', reviewedDetailCtrl);

    reviewedDetailCtrl.$inject = ['localStorageService', '$scope', 'revieweddetailservice', 'ngDialog', 'coreService'];

    /* @ngInject */
    function reviewedDetailCtrl(localStorageService, $scope, revieweddetailservice, ngDialog, coreService) {
        var vm = this;
        var reviewed_id = $scope.ngDialogData.reviewed_id;
        vm.is_view = $scope.ngDialogData.is_view;
        vm.cancelOp = cancelOp;
        var loadReviewed = loadReviewed;
        var setReviewed = setReviewed;
        vm.saveReviewed = saveReviewed;
        vm.cancelOp = cancelOp;

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


        function setReviewed(response) {
            vm.matter =response.data.matter;

        }

        function saveReviewed () {
            revieweddetailservice.saveReviewed(params)
                .then(saveReviewedSuccess)
        }

        function saveReviewedSuccess(response) {
            vm.question = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();

        }

        activate();
        function activate() {
            loadReviewed();
        }

        //加载详细信息
        function loadReviewed() {
            var params = {id: $scope.ngDialogData.reviewed_id};
            revieweddetailservice.loadReviewed(params)
                .then(setReviewed);
        }

    }
})();

