/**
 * @author maxzhao
* @time 2018/09/05.
 */
(function (rootPath) {
    'use strict';

    angular
        .module('app.querymonitordatashare')
        .service('querymonitordatashareOtherShareService', querymonitordatashareOtherShareService);
    querymonitordatashareOtherShareService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function querymonitordatashareOtherShareService($http, SYSTEM) {

        this.addCollect = function addCollect(params) {
            return $http({
                url: rootPath + 'T_fine_collect/add/collct',
                method: 'GET',
                params: params
            });
        };
        this.loadOSList = function loadOSList(params) {
            params.os = true;
            return $http({
                url: rootPath + 'T_fine_config/list',
                method: 'GET',
                params: params
            });
        };
    }
})('../');


