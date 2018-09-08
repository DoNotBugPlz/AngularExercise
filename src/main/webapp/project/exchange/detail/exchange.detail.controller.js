(function () {
    'use strict';

    angular
        .module('app.exchange')
        .controller('exchangeDetailCtrl', ExchangeDetailCtrl);

    ExchangeDetailCtrl.$inject = ['$scope', 'ngDialog', 'coreService', 'exchangeDetailService'];

    /* @ngInject */
    function ExchangeDetailCtrl($scope, ngDialog, coreService, exchangeDetailService) {
        var vm = this;
        //父级页面传参--数据id
        var exchangeId = $scope.ngDialogData.exchangeId;
        //父级页面传参
        vm.is_view = $scope.ngDialogData.is_view;
        vm.is_answer = $scope.ngDialogData.is_answer;
        //加载详细信息
        var loadExchange = loadExchange;
        //关闭弹窗页
        vm.cancelOp = cancelOp;
        //保存详细信息
        vm.saveExchange = saveExchange;
        // 回复
        vm.answerExchange = answerExchange;

        activate();

        ////////////////
        function activate() {
            if (!angular.isUndefined(exchangeId)) {
                loadExchange(exchangeId);
            }
        }

        //加载详细信息
        function loadExchange(exchangeId) {
            var params = {id: exchangeId};
            exchangeDetailService.loadExchange(params)
                .then(setExchange);
        }

        function setExchange(response) {
            vm.exchange = response.data;
        }

        //新增保存
        function saveExchange() {
            if ($scope.exchange_form.$valid) {
                exchangeDetailService.saveExchange(vm.exchange)
                    .then(saveExchangeSuccess)
            } else {
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }

        //回复
        function answerExchange() {
            if ($scope.exchange_form.$valid) {
                exchangeDetailService.answerExchange(vm.exchange)
                    .then(saveExchangeSuccess)
            } else {
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }

        function saveExchangeSuccess(response) {
            vm.exchange = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();
        }

        //关闭弹窗
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


    }
})();

