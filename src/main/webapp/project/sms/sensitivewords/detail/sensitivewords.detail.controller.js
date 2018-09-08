(function () {
    'use strict';

    angular
        .module('app.sensitive')
        .controller('sensitivewordsCtrl', sensitivewordsCtrl);

    sensitivewordsCtrl.$inject = ['localStorageService', '$scope', 'sensitivewordsdetailservice', 'ngDialog', 'coreService'];

    /* @ngInject */
    function sensitivewordsCtrl(localStorageService, $scope, sensitivewordsdetailservice, ngDialog, coreService) {
        var vm = this;
        var ids = $scope.ngDialogData.ids;
        vm.is_view = $scope.ngDialogData.is_view;
        vm.cancelOp = cancelOp;
        var loadsensitivewords = loadsensitivewords;
        var setsensitivewords = setsensitivewords;
        vm.savesensitivewords = savesensitivewords;
        vm.cancelOp = cancelOp;
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        function setsensitivewords(response) {
            vm.T_Sensitiveword = response.data;
            $("#id").html(response.data.id);
        }

        function savesensitivewords () {
            var params = vm.T_Sensitiveword;
            sensitivewordsdetailservice.savesensitivewords(params)
                .then(saveSmsSuccess)
        }

        function saveSmsSuccess(response) {
            vm.question = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();
        }

        activate();
        function activate() {
            loadsensitivewords();
        }

        //加载详细信息
        function loadsensitivewords() {
            var params = {ids: $scope.ngDialogData.ids};
            sensitivewordsdetailservice.loadsensitivewords(params)
                .then(setsensitivewords);
        }

    }
})();

