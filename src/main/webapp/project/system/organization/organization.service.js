(function (rootPath) {
    'use strict';

    angular
        .module('app.organization')
        .service('organizationService', organizationService);
    organizationService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function organizationService($http,SYSTEM) {
        this.getDeptInfoById = function (params) {
            return $http({
                url: rootPath + "Cf_dept_ext/getMonitorCenterById.do",
                method: 'GET',
                params: params
            })
        };

        this.saveOrganization = function (params) {
            return $http({
                url: rootPath + "Cf_dept_ext/saveMonitorCenter.do",
                method: 'POST',
                data: params
            })
        };
        this.loadDeptTree = function () {
            return $http({
                url: rootPath + "Cf_dept_ext/LoadPageListForConfig.do",
                method: 'GET'
            })
        }
    }

})('../');


