
(function (rootPath) {
    'use strict';

    angular
        .module('app.menu')
        .service('menuDetailService', menuDetailService);
    menuDetailService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function menuDetailService($http,SYSTEM) {
        this.loadMenuInf = function (params) {
            return $http({
                url: rootPath + "Sys_menu_ext/LoadMenu.do",
                method: 'get',
                params: params
            })
        };
        this.saveMenu = function (params) {
            return $http({
                url: rootPath + "Sys_menu_ext/SaveForm.do",
                method: 'post',
                data: params
            })
        }
    }

})('../');


