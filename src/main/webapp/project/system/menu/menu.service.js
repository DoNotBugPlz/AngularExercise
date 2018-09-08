
(function (rootPath) {
    'use strict';

    angular
        .module('app.menu')
        .service('menuService', menuService);
    menuService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function menuService($http,SYSTEM) {
        this.loadMenuTree = function () {
            return $http({
                url: rootPath + "Sys_menu/LoadPageList.do",
                method: 'GET'
            })
        };
        this.destoryMenuList = function (params) {
            return $http({
                url: rootPath + "Sys_menu_ext/DestroyList.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'POST',
                data: params
            })
        };
        this.deleteMenuList = function (params) {
            return $http({
                url: rootPath + "Sys_menu/DeleteList.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'POST',
                data: params
            })
        };
        this.unDeleteMenuList = function (params) {
            return $http({
                url: rootPath + "Sys_menu/UnDeleteList.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'POST',
                data: params
            })
        }
    }

})('../');


