/**
 * Created by Administrator on 2018/7/24.
 */
(function (rootPath) {
    'use strict';
    angular
        .module('app.category')
        .service('categoryService', categoryService);
    categoryService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function categoryService($http,SYSTEM) {
        // 获取字典列表
        this.loadSysCategory = function (params) {
            return $http({
                url: rootPath + "Sys_category/LoadPageList.do",
                method: 'get',
                params: params
            })
        }

        // 禁用字典项
        this.deleteCategorys = function (params) {
            return $http({
                url: rootPath + "Sys_category/DeleteList.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }

        // 启用字典项
        this.undeleteCategorys = function (params) {
            return $http({
                url: rootPath + "Sys_category/ResetList.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
    }
})('../');