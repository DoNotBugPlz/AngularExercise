/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function () {
    'use strict';

    angular
        .module('app.querymonitordatashare')
        .controller('QuerymonitordatashareDetailCtrl', QuerymonitordatashareDetailCtrl);
    QuerymonitordatashareDetailCtrl.$inject = ['$scope', 'querymonitordatashareDetailService', 'ngDialog', '$sce', 'SYSTEM'];

    /* @ngInject */
    function QuerymonitordatashareDetailCtrl($scope, querymonitordatashareDetailService, ngDialog, $sce, SYSTEM) {
        var vm = this;
        window.vm = vm;
        var end_url = $scope.ngDialogData.biUrl;
        var is_view = $scope.ngDialogData.is_view;
        var is_edit = $scope.ngDialogData.is_edit;
        var hideTop = $scope.ngDialogData.hideTop;
        vm.title = 'QuerymonitordatashareDetailCtrl';
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


