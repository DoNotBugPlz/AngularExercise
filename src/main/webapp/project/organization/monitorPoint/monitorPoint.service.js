/**
 * Created by tr on 2018年8月22日10:45:41
 */
(function (rootPath) {
    'use strict';
    angular.module('app.mp')
        .service('mpService',mpService);
    mpService.$inject = ['$http','SYSTEM'];

    function mpService($http,SYSTEM) {

        /** 获取部门树 */
        this.loadDeptTree = function () {
            return $http({
                url: rootPath + "Cf_dept_ext/LoadDeptInfoList.do",
                method: 'GET'
            })
        };

        this.loadCmsList = function (params) {
            return $http({
                url: rootPath + "Cf_m_site/LoadList",
                method: 'get',
                params: params
            })
        };


    }

})('../');