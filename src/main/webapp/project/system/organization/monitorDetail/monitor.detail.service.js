
(function (rootPath) {
    'use strict';

    angular
        .module('app.organization')
        .service('monitorService', monitorService);
    monitorService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function monitorService($http,SYSTEM) {
        this.getDeptInfoById = function (params) {
            return $http({
                url: rootPath + "Cf_dept_ext/getMonitorCenterById.do",
                method: 'GET',
                params: params
            })
        };

        this.saveOrUpdateDept = function (params) {
            return $http({
                url: rootPath + "Cf_dept_ext/saveOrUpdateMonitorCenter",
                method: 'POST',
                data: params
            })
        };
    }

})('../');


