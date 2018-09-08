(function (rootPath) {
    'use strict';
    angular
        .module('app.monitoringPointWorker')
        .service('monitoringPointWorkerService', monitoringPointWorkerService);
    monitoringPointWorkerService.$inject = ['$http'];
    /* @ngInject */
    function monitoringPointWorkerService($http) {

        this.loadMonitoringPointWorkerList = function (params) {
            return $http({
                url: rootPath + "Cf_goods_bar_code/list",
                method: 'get',
                params: params
            })
        };

    }

})('../');


