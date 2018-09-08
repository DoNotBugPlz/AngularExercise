/**
 * @author maxzhao
 * @time 2018/08/20.
 */
(function () {
    'use strict';
    angular.module('app.institutions')
        .controller('denoterInstitutionsCtrl', denoterInstitutionsCtrl);
    denoterInstitutionsCtrl.$inject = ['$scope', 'institutionsService', '$sce', 'SYSTEM'];


    function denoterInstitutionsCtrl($scope, institutionsService, $sce, SYSTEM) {
        var vm = this;
        window.vm = vm;
        vm.title = "denoterInstitutionsCtrl";
        function active() {
            vm.siUrl = $sce.trustAs($sce.RESOURCE_URL,SYSTEM.FineReportURL+
                '?reportlet=' +
                'IntegratedWorkingPlatform/OrganizationAndPersonManagerment/DenoterInstitutions.cpt'
                + '&op=view');
        }

        active();
    }

})();