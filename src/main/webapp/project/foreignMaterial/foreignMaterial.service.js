/**
 * Created by tr on 2018年8月22日10:45:41
 */
(function (rootPath) {
    'use strict';
    angular.module('app.foreign_material')
        .service('foreignMaterialService',foreignMaterialService);
    foreignMaterialService.$inject = ['$http','SYSTEM'];

    function foreignMaterialService($http,SYSTEM) {
        this.loadForeignMaterialList = loadForeignMaterialList;
        this.delFmInfoOp = delFmInfoOp;


        function loadForeignMaterialList(params) {
            return $http({
                url: rootPath + "T_foreign_material/LoadForeignMaterialList",
                method: 'get',
                params: params
            })
        };
        
        function delFmInfoOp(params) {
            return $http({
                url: rootPath + "T_foreign_material/DestroyList",
                method: 'post',
                data: params
            })
            
        };



    }

})('../');