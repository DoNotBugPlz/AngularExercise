/**
 * Created by tr
 */
(function (rootPath) {
    'use strict';
    angular.module('app.wqt')
        .service('wqtDetailService',wqtDetailService);
    wqtDetailService.$inject = ['$http','SYSTEM'];
    function wqtDetailService($http,SYSTEM) {

        this.saveInfo = saveInfo;
        this.getInfoById = getInfoById;
        function saveInfo(params) {
            return $http({
                url: rootPath + "Oa_wqt/Save",
                method: 'post',
                data: params
            })
        }

        function getInfoById(params) {
            return $http({
                url: rootPath + "Oa_wqt/getInfoById",
                method: 'get',
                params: params
            })
        }




    }
})('../');