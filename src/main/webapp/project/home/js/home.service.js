(function (rootPath) {
    'use strict';

    angular
        .module('app.home')
        .service('homeService', homeService);
    homeService.$inject = ['$http'];
    /* @ngInject */
    function homeService($http) {
        this.loadChildAndSonMenuList = loadChildAndSonMenuList;
        this.loadShortcutMenuList = loadShortcutMenuList;
        this.getShowMenus = getShowMenus;

        function loadChildAndSonMenuList(id) {
            id = id === undefined ? '' : id;
            return $http.get(rootPath + 'Sys_menu_ext/LoadChildAndSonMenuList.do?menuParentId=' + id);
        }

        function loadShortcutMenuList() {
            return $http.get(rootPath + 'Sys_menu_ext/loadShortcutMenuList.do');
        }



        function getShowMenus(id) {
            id = id === undefined ? '' : id;
            return $http.get(rootPath + 'Sys_menu_ext/LoadMenuList.do?menuParentId=' + id);
        }


    }

})("../");
