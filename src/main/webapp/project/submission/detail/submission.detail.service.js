(function (rootPath) {
    'use strict';

    angular
        .module('app.material')
        .service('submissionDetailService', submissionDetailService);
    submissionDetailService.$inject = ['$http'];

    /* @ngInject */
    function submissionDetailService($http) {
        this.loadMaterial = loadMaterial;
        this.saveSubmission = saveSubmission;

        function loadMaterial(params) {
            return $http({
                url: rootPath + "T_material_submission/loadMaterial.do",
                method: 'get',
                params: params
            })
        }

        /*报送监测材料*/
        function saveSubmission(params) {
            return $http({
                url: rootPath + "T_material_submission/save.do",
                method: 'post',
                data: params
            })
        }


    }

})('../');


