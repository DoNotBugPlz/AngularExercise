(function (rootPath) {
    'use strict';

    angular
        .module('app.home')
        .service('shortcutMenuSelectService', shortcutMenuSelectService);
    shortcutMenuSelectService.$inject = ['$http'];
    /* @ngInject */
    function shortcutMenuSelectService($http) {
        this.saveShortcutMenuList = saveShortcutMenuList;

        this.loadShortcutTree = function () {
            return $http({
                url: rootPath + "Sys_menu_ext/LoadMenuList.do",
                method: 'GET'
            })
        }

        function saveShortcutMenuList(params) {
            return $http({
                url: rootPath + "T_shortcut_menu/save.do",
                method: 'post',
                data: params
            })
        }
    }

})('../');


