(function (rootPath) {
    'use strict';
    angular
        .module('app.monitoringPointWorker')
        .service('monitoringPointWriteService', monitoringPointWriteService);
    monitoringPointWriteService.$inject = ['$http'];
    /* @ngInject */
    function monitoringPointWriteService($http) {

        this.loadMonitoringPointWorkerList = function (params) {
            return $http({
                url: rootPath + "Cf_goods_bar_code/list",
                method: 'get',
                params: params
            })
        };

    }

})('../');


