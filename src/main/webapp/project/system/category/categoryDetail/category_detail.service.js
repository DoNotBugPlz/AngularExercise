/**
 * Created by tr on 2018年8月17日13:52:56
 */
(function (rootPath) {
    'use strict';
    angular.module('app.category')
        .service('categoryDetailService',categoryDetailService);
    categoryDetailService.$inject = ['$http','SYSTEM'];

    function categoryDetailService($http,SYSTEM) {
       this.loadCategoryDetail = function (params) {// 获取字典信息
            return $http({
                url: rootPath + "Sys_category/LoadForm.do",
                method: 'get',
                params: params
            })
        }
        this.addSysCategory = function (params) {// 新增
            return $http({
                url: rootPath + "Sys_category/SaveForm.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
        this.validConstName = function (params) {// 验证常量标识是否可用
            return $http({
                url: rootPath + "Sys_category/ValidConstName.do",
                method: 'get',
                params: params
            })
        }
        this.loadAllCategory = function () {// 获取所有字典项下拉框
            return $http({
                url: rootPath + "Sys_category/LoadAllCategory.do",
                method: 'get'
            })
        }


    }
})('../');