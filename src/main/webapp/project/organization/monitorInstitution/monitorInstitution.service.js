(function (rootPath) {
    'use strict';

    angular
        .module('app.monitorInstitution')
        .service('monitorInstitutionService', monitorInstitutionService);
    monitorInstitutionService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function monitorInstitutionService($http,SYSTEM) {

        this.getDeptInfoById = function (params) {
            return $http({
                url: rootPath + "Cf_dept_ext/getMonitorCenterById.do",
                method: 'GET',
                params: params
            })
        };

        this.saveOrUpdateDept = function (params) {
            return $http({
                url: rootPath + "Cf_dept_ext/saveOrUpdateDept.do",
                method: 'POST',
                data: params
            })
        };

        /** 获取部门树 */
        this.loadDeptTree = function () {
            return $http({
                url: rootPath + "Cf_dept_ext/LoadPageListForConfig.do",
                method: 'GET'
            })
        };

        /** 监测机构查询展示监测机构列表*/
        this.loadDeptList = function (params){
            return $http({
                url: rootPath + "Cf_dept_ext/LoadDeptList",
                method: 'GET',
                params: params
            });
        };

        /** 查询工作人员列表 */
        this.loadUserList = function (params){
            return $http({
                url: rootPath + "Cf_user_ext/LoadWorkUserList",
                method: 'GET',
                params: params
            });
        };

        this.batchModUserDelstatus = function (params){
            return $http({
                url: rootPath + "Cf_user_ext/BatchModUserDelstatus",
                method: 'POST',
                data: params
            });
        };
    }

})('../');


