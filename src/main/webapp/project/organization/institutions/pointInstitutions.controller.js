/**
 * @author maxzhao
 * @time 2018/08/20.
 */
(function () {
    'use strict';
    angular.module('app.institutions')
        .controller('pointInstitutionsCtrl', pointInstitutionsCtrl);
    pointInstitutionsCtrl.$inject =  ['$scope', 'institutionsService', '$sce','SYSTEM'];


    function pointInstitutionsCtrl($scope, institutionsService, $sce,SYSTEM) {
        var vm = this;
        window.vm = vm;
        vm.title = "pointInstitutionsCtrl";
        function active() {
            vm.siUrl = $sce.trustAs($sce.RESOURCE_URL,SYSTEM.FineReportURL+
                '?reportlet=' +
                'IntegratedWorkingPlatform/OrganizationAndPersonManagerment/PointInstitutions.cpt'
                + '&op=view');
        }
        active();
    }

})();