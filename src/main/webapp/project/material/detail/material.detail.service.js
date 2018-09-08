(function (rootPath) {
    'use strict';

    angular
        .module('app.material')
        .service('materialDetailService', materialDetailService);
    materialDetailService.$inject = ['$http'];

    /* @ngInject */
    function materialDetailService($http) {
        this.loadMaterial = loadMaterial;
        this.saveMaterial = saveMaterial;

        function loadMaterial(params) {
            return $http({
                url: rootPath + "T_material_info/loadMaterial.do",
                method: 'get',
                params: params
            })
        }

        /*新增或修改监测材料*/
        function saveMaterial(params) {
            return $http({
                url: rootPath + "T_material_info/save.do",
                method: 'post',
                data: params
            })
        }


    }

})('../');


