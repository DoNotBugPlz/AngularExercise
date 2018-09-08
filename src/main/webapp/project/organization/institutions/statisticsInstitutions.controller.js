/**
 * @author maxzhao
 * @time 2018/08/20.
 */
(function () {
    'use strict';
    angular.module('app.institutions')
        .controller('statisticsInstitutionsCtrl', statisticsInstitutionsCtrl);
    statisticsInstitutionsCtrl.$inject = ['$scope', 'institutionsService', '$sce', 'SYSTEM'];


    function statisticsInstitutionsCtrl($scope, institutionsService, $sce, SYSTEM) {
        var vm = this;
        window.vm = vm;
        vm.title = "statisticsInstitutionsCtrl";

        function active() {
            vm.siUrl = $sce.trustAs($sce.RESOURCE_URL, SYSTEM.FineReportURL +
                '?reportlet=' +
                'IntegratedWorkingPlatform/OrganizationAndPersonManagerment/StatisticsInstitutions.cpt'
                + '&op=view');
        }

        active();
    }

})();