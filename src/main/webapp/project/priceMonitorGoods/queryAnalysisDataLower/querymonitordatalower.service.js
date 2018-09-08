/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function (rootPath) {
    'use strict';

    angular
        .module('app.querymonitordatalower')
        .service('querymonitordatalowerService', querymonitordatalowerService);
    querymonitordatalowerService.$inject = ['$http', 'SYSTEM', '_'];

    /* @ngInject */
    function querymonitordatalowerService($http, SYSTEM, _) {
        this.save = function (params) {
            return $http({
                url: rootPath + 'T_fine_config/save',
                method: 'POST',
                data: params
            });
        };
        this.delData = function (params) {
            return $http({
                url: rootPath + 'T_fine_config/del',
                method: 'GET',
                params: params
            });
        };
        this.loadList = function (params) {
            return $http({
                url: rootPath + 'T_fine_config/list',
                method: 'GET',
                params: params
            });
        };
        this.searchDataByNoUrl = function (params) {
            return $http({
                url: rootPath + 'T_fine_config/list/nourl',
                method: 'GET',
                params: params
            });
        };
        this.cancelCollctData = function (params) {
            return $http({
                url: rootPath + 'T_fine_collect/cancel/collct',
                method: 'GET',
                params: params
            });
        };

    }
})('../');


