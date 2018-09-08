
(function (rootPath) {
    'use strict';

    angular
        .module('app.monitorTableQuery')
        .service('monitorTableQueryService', monitorTableQueryService);
    monitorTableQueryService.$inject = ['$http'];
    /* @ngInject */
    function monitorTableQueryService($http) {
        this.loadMonitorTableQueryList = function (params) {
            return $http({
                url: rootPath + "T_monitorTableQuery/LoadList",
                method: 'get',
                params: params
            })
        };
        this.delMonitorTableQueryList = function (params) {
            return $http({
                url: rootPath + "T_monitorTableQuery/DestroyList",
                method: 'post',
                data: params
            })
        };
    }

})('../');


