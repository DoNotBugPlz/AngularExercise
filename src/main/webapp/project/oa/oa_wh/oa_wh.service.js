/**
 * Created by tr on 2018年8月22日10:45:41
 */
(function (rootPath) {
    'use strict';
    angular.module('app.wh')
        .service('whService',whService);
    whService.$inject = ['$http','SYSTEM'];

    function whService($http,SYSTEM) {
        this.loadWhlList = loadWhlList;
        this.disableInfo = disableInfo;
        this.undeleteInfo  = undeleteInfo;
        this.delinfo = delinfo;

        function loadWhlList(params){
            return $http({
                url: rootPath + "Oa_wh/LoadWhList",
                method: 'get',
                params: params
            })

        }
        
        function disableInfo(params) {
            return $http({
                url: rootPath + "Oa_wh/getDisable.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
        
        function undeleteInfo(params) {
            return $http({
                url: rootPath + "Oa_wh/getEnabe.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }

        function delinfo(params) {
            return $http({
                url: rootPath + "Oa_wh/DestroyList",
                method: 'post',
                data: params
            })
        }
        








    }

})('../');