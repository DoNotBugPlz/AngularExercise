/**
 * Created by tr
 */
(function (rootPath) {
    'use strict';
    angular.module('app.fau')
        .service('fauDetailService',fauDetailService);
    fauDetailService.$inject = ['$http','SYSTEM'];
    function fauDetailService($http,SYSTEM) {

        this.loadFauInfo = function (params) {
            return $http({
                url: rootPath + "Flow_activity_user/LoadObj.do",
                method: 'get',
                params: params
            })
        }

        this.saveFauInfo = function (params) {
            return $http({
                url: rootPath + "Flow_activity_user/Save.do",
                method: 'post',
                data: params
            })
        }


    }
})('../');