(function (rootPath) {
    'use strict';

    angular
        .module('app.organization')
        .service('deptInfoService', deptInfoService);
    deptInfoService.$inject = ['$http'];
    /* @ngInject */
    function deptInfoService($http) {
        this.loadDeptInf = function (params) {
            return $http({
                url: rootPath + "Cf_dept_ext/getMonitorCenterById",
                method: 'get',
                params: params
            })
        };
        this.saveDept = function (params) {
            return $http({
                url: rootPath + "Cf_dept_ext/saveOrUpdateDept",
                method: 'POST',
                data: params
            })
        }
    }

})('../');


