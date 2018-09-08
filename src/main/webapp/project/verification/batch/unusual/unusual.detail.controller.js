(function () {
    'use strict';

    angular
        .module('app.batch')
        .controller('unusualeCtrl', unusualeCtrl);

    unusualeCtrl.$inject = ['localStorageService', '$scope', 'unusualDetailService', 'ngDialog', 'coreService'];

    /* @ngInject */
    function unusualeCtrl(localStorageService, $scope, unusualDetailService, ngDialog, coreService) {
        var vm = this;
        var unusual_id = $scope.ngDialogData.unusual_id;
        vm.is_view = $scope.ngDialogData.is_view;
        vm.cancelOp = cancelOp;
        var loadUnusual = loadUnusual;
        var setUnusual = setUnusual;
        vm.cancelOp = cancelOp;

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


        activate();
        function activate() {
            loadUnusual();
        }
        //加载详细信息
        function loadUnusual() {
            var params = {id: $scope.ngDialogData.unusual_id};
            unusualDetailService.loadUnusual(params)
                .then(setUnusual);
        }

        function setUnusual(response) {
            vm.Unusual =response.data.Unusual;
        }

    }
})();

