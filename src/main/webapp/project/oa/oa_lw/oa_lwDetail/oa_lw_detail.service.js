/**
 * Created by tr
 */
(function (rootPath) {
    'use strict';
    angular.module('app.lw')
        .service('lwDetailService',lwDetailService);
    lwDetailService.$inject = ['$http','SYSTEM'];
    function lwDetailService($http,SYSTEM) {

        this.saveLw = function (params) {
            return $http({
                url: rootPath + "Oa_lw/Save.do",
                method: 'post',
                data: params
            })
        }
        this.loadLw = function (params) {
            return $http({
                url: rootPath + "Oa_lw/LoadObj.do",
                method: 'get',
                params: params
            })
        }



    }
})('../');