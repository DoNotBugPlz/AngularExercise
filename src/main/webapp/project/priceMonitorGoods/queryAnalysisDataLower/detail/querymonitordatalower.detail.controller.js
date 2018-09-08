/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function () {
    'use strict';

    angular
        .module('app.querymonitordatalower')
        .controller('QuerymonitordatalowerDetailCtrl', QuerymonitordatalowerDetailCtrl);
    QuerymonitordatalowerDetailCtrl.$inject = ['$scope', 'querymonitordatalowerDetailService', 'ngDialog', '$sce', 'SYSTEM'];

    /* @ngInject */
    function QuerymonitordatalowerDetailCtrl($scope, querymonitordatalowerDetailService, ngDialog, $sce, SYSTEM) {
        var vm = this;
        window.vm = vm;
        var end_url = $scope.ngDialogData.biUrl;
        var is_view = $scope.ngDialogData.is_view;
        var is_edit = $scope.ngDialogData.is_edit;
        var hideTop = $scope.ngDialogData.hideTop;
        vm.title = 'QuerymonitordatalowerDetailCtrl';
        active();

        function active() {
            if (is_view) {
                // end_url += '&show=_bi_show_';
                end_url += '&hideTop=true'
            } else if (is_edit) {
                end_url += '&edit=_bi_edit_';
            } else if (hideTop) {
                end_url += '&hideTop=true'
            }
            var url = SYSTEM.FineBIURL + end_url;
            vm.biUrl = $sce.trustAs($sce.RESOURCE_URL, url);
        }
    }
})();


