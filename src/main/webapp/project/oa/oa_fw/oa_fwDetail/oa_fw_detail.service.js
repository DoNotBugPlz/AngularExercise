/**
 * Created by tr
 */
(function (rootPath) {
    'use strict';
    angular.module('app.fw')
        .service('fwDetailService',fwDetailService);
    fwDetailService.$inject = ['$http','SYSTEM'];
    function fwDetailService($http,SYSTEM) {

        this.saveFw = function (params) {
            return $http({
                url: rootPath + "Oa_fw/Save.do",
                method: 'post',
                data: params
            })
        }
        this.loadFw = function (params) {
            return $http({
                url: rootPath + "Oa_fw/LoadObj.do",
                method: 'get',
                params: params
            })
        }



    }
})('../');