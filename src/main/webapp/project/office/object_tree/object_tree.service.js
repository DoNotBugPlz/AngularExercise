/**
 * @author maxzhao
 * @time 2018/08/15.
 */
(function (rootPath) {
    'use strict';
    angular
        .module('app.office')
        .service('treeService', treeService);
    treeService.$inject = ['$http'];

    function treeService($http) {

        this.loadObjectTree = function loadObjectTree() {
            return $http({
                url: rootPath + "T_notice/tree/object.do",
                method: 'GET'
            });
        };
        this.loadUserList=function (params) {
            return $http({
                url: rootPath + "T_notice/tree/object.do",
                method: 'GET'
            });
        };
        this.getDeptUsers = function (params) {
            return $http({
                url: rootPath + 'T_notice/tree/object/user', method: 'GET',
                params: params
            });
        };

    }
})('../');
