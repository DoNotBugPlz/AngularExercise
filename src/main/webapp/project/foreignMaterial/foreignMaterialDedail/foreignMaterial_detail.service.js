/**
 * Created by tr
 */
(function (rootPath) {
    'use strict';
    angular.module('app.foreign_material')
        .service('foreignMateriaDetailService',foreignMateriaDetailService);
    foreignMateriaDetailService.$inject = ['$http','SYSTEM'];
    function foreignMateriaDetailService($http,SYSTEM) {
        this.saveInfo = saveInfo;
        function saveInfo(params) {
            return $http({
                url: rootPath + "T_foreign_material/Save.do",
                method: 'post',
                data: params
            })
        }
        


    }
})('../');