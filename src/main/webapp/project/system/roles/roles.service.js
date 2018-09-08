/**
 * Created by tr on 2018年8月6日21:01:05.
 */
(function (rootPath) {
    'use strict';
    angular.module('app.roles')
        .service('rolesService',rolesService);
    rolesService.$inject = ['$http','SYSTEM'];

    function rolesService($http,SYSTEM) {
        // 获取所有角色列表
        this.loadRolesList = function () {
            return $http({
                url: rootPath + "Sys_roles/LoadPageList.do",
                method: 'get'
            })
        }
        // 禁用角色
        this.deleteRoles = function (params) {
            return $http({
                url: rootPath + "Sys_roles/DeleteList.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
        // 启用角色
        this.undeleteRoles = function (params) {
            return $http({
                url: rootPath + "Sys_roles/UnDeleteList.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
        // 加载角色分配列表
        this.loadCanUseRolesList = function (params) {
            return $http({
                url: rootPath + "Sys_roles/LoadCanUseRolesList.do",
                method: 'get',
                params: params
            })
        }
        // 保存角色分配
        this.saveCanUseRoles =function (params) {
            return $http({
                url: rootPath + "Sys_roles/SaveCanUseRoles.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
        // 角色菜单权限列表
        this.loadRolesMenusList = function (params) {
            return $http({
                url: rootPath + "Sys_menu/LoadRolesMenusList.do",
                method: 'get',
                params: params
            })
        }
        // 修改菜单权限
        this.saveRolesMenus = function (params) {
            return $http({
                url: rootPath + "Sys_roles/SaveRoleMenuPerms.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }




    }
})('../');