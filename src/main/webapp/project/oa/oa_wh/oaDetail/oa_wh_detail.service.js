/**
 * Created by tr
 */
(function (rootPath) {
    'use strict';
    angular.module('app.wh')
        .service('whDetailService',whDetailService);
    whDetailService.$inject = ['$http','SYSTEM'];
    function whDetailService($http,SYSTEM) {

        this.saveInfo = saveInfo;
        this.getInfoById = getInfoById;
        function saveInfo(params) {
            return $http({
                url: rootPath + "Oa_wh/Save",
                method: 'post',
                data: params
            })
        }

        function getInfoById(params) {
            return $http({
                url: rootPath + "Oa_wh/getInfoById",
                method: 'get',
                params: params
            })
        }



    }
})('../');