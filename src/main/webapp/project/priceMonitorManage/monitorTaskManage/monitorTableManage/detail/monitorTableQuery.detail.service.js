
(function (rootPath) {
    'use strict';

    angular
        .module('app.monitorTableQuery')
        .service('monitorTableQueryDetailService', monitorTableQueryDetailService);
    monitorTableQueryDetailService.$inject = ['$http'];
    /* @ngInject */
    function monitorTableQueryDetailService($http) {
        this.loadMonitorTableQuery = function (params) {
            return $http({
                url: rootPath + "T_monitorTableQuery/LoadObj.do",
                method: 'get',
                params: params
            })
        }
        this.saveMonitorTableQuery = function (params) {
            return $http({
                url: rootPath + "T_monitorTableQuery/Save.do",
                method: 'post',
                data: params
            })
        }
    }

})('../');


