
(function (rootPath) {
    'use strict';

    angular
        .module('app.dept')
        .service('deptDetailService', deptDetailService);
    deptDetailService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function deptDetailService($http,SYSTEM) {
        this.loadDeptInf = function (params) {
            return $http({
                url: rootPath + "Sys_dept/LoadForm.do",
                method: 'get',
                params: params
            })
        };
        this.saveDept = function (params) {
            return $http({
                url: rootPath + "Sys_dept/SaveForm.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                data: params
            })
        }
    }

})('../');


