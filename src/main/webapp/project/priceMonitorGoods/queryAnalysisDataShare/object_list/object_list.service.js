/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function (rootPath) {
    'use strict';
    angular
        .module('app.office')
        .service('objectListService', objectListService);
    objectListService.$inject = ['$http'];

    function objectListService($http) {
        /**
         *
         * @param params user_ids config_id
         * @returns {*}
         */
        this.saveObjectList = function loadObjectTree(params) {
            return $http({
                url: rootPath + "T_fine_object/save/all.do",
                method: 'GET',
                params: params
            });
        };
        /**
         *
         * @param params  config_id
         * @returns {*}
         */
        this.loadObjectList = function loadObjectTree(params) {
            return $http({
                url: rootPath + "T_fine_object/list.do",
                method: 'GET',
                params: params
            });
        };
        this.getDeptUsers = function (params) {
            return $http({
                url: rootPath + 'T_notice/tree/object/user',
                method: 'GET',
                params: params
            });
        };

    }
})('../');
