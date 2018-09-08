(function (rootPath) {
    'use strict';

    angular
        .module('app.material')
        .service('materialService', materialService);
    materialService.$inject = ['$http'];
    /* @ngInject */
    function materialService($http) {

        //加载列表数据
        this.loadMaterialList = function (params) {
            return $http({
                url: rootPath + "T_material_info/list",
                method: 'get',
                params: params
            })
        };

        //单个、批量删除
        this.deleteMaterialList = function (params) {
            return $http({
                url: rootPath + "T_material_info/list/del",
                method: 'post',
                data: params
            })
        };


    }

})('../');


