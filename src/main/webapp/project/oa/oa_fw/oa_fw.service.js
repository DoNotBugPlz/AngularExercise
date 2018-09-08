/**
 * Created by tr on 2018年8月22日10:45:41
 */
(function (rootPath) {
    'use strict';
    angular.module('app.fw')
        .service('fwService',fwService);
    fwService.$inject = ['$http','SYSTEM'];

    function fwService($http,SYSTEM) {

        this.loadFwlList = loadFwlList;
        function loadFwlList(params) {
            return $http({
                url: rootPath + "Oa_fw/LoadFwList",
                method: 'get',
                params: params
            })
            
        }

        this.text = text;
        function text(params) {
            return $http({
                url: rootPath + "Sys_user_roles/Save",
                method: 'get',
                params: params
            })

        }
        
        





    }

})('../');