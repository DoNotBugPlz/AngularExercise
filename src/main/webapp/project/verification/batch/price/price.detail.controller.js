(function () {
    'use strict';

    angular
        .module('app.batch')
        .controller('priceCtrl', priceCtrl);

    priceCtrl.$inject = ['localStorageService', '$scope', 'priceDetailService', 'ngDialog', 'coreService'];

    /* @ngInject */
    function priceCtrl(localStorageService, $scope, priceDetailService, ngDialog, coreService) {
        var vm = this;
        var Price_id = $scope.ngDialogData.Price_id;
        vm.is_view = $scope.ngDialogData.is_view;
        vm.cancelOp = cancelOp;
        var loadPrice = loadPrice;
        var setPrice = setPrice;
        vm.cancelOp = cancelOp;

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


        activate();
        function activate() {
            loadPrice();
        }
        //加载详细信息
        function loadPrice() {
            var params = {id: $scope.ngDialogData.Price_id};
            priceDetailService.loadPrice(params)
                .then(setPrice);
        }

        function setPrice(response) {
            vm.Price =response.data.Price;
        }

    }
})();

