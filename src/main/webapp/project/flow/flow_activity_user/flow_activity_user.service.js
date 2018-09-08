/**
 * Created by tr on 2018年8月22日10:45:41
 */
(function (rootPath) {
    'use strict';
    angular.module('app.fau')
        .service('fauService',fauService);
    fauService.$inject = ['$http','SYSTEM'];

    function fauService($http,SYSTEM) {


        this.flowList = flowList;
        function flowList(params) {
            return $http({
                url: rootPath + "app/rest/models",
                method: 'get',
                params: params
            })
        }

        this.flowStepList = flowStepList;
        function flowStepList(params) {
            var keyValue = params + '/model-json?nocaching=1536047880861';
            return $http({
                url: rootPath + "app/rest/models/"+keyValue,
                method: 'get'
            })
        }


        /*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.loadFauList = loadFauList;
        function loadFauList(params) {
            return $http({
                url: rootPath + "Flow_activity_user/LoadFauList",
                method: 'get',
                params: params
            })
        }

        this.delFauList = function (params) {
            return $http({
                url: rootPath + "Flow_activity_user/DestroyList",
                method: 'post',
                data: params
            })
        };





    }

})('../');