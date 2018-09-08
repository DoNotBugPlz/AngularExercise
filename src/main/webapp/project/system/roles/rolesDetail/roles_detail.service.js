/**
 * Created by Administrator on 2018/7/27.
 */
(function (rootPath) {
    'use strict';
    angular.module('app.roles')
        .service('rolesDetailService',rolesDetailService);
    rolesDetailService.$inject = ['$http','SYSTEM'];
    function rolesDetailService($http,SYSTEM) {
        // 新增或修改角色信息
        this.addOrUpdateRoles = function (params) {
            return $http({
                url: rootPath + "Sys_roles/SaveForm.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
    }
})('../');