/**
 * Created by tr on 2018年8月17日16:20:48
 */
(function (rootPath) {
    'use strict';
    angular.module('app.category')
        .service('categoryValueService',categoryValueService);
    categoryValueService.$inject = ['$http','SYSTEM'];

    function categoryValueService($http,SYSTEM) {
        this.loadSysCategoryValueList = function (params) {
            return $http({
                url: rootPath + "Sys_categoryvalue/LoadPageList.do",
                method: 'get',
                params: params
            })
        }
        this.deleteCategoryValues = function (params) {
            return $http({
                url: rootPath + "Sys_categoryvalue/DeleteList.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
        this.undeleteCategoryValues = function (params) {
            return $http({
                url: rootPath + "Sys_categoryvalue/ResetList.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
    }
})('../');