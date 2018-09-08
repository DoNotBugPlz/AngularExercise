
(function (rootPath) {
    'use strict';

    angular
        .module('app.dept')
        .service('deptService', deptService);
    deptService.$inject = ['$http'];
    /* @ngInject */
    function deptService($http) {
        this.loadDeptTree = function () {
            return $http({
                url: rootPath + "Sys_dept/LoadPageListForConfig.do",
                method: 'GET'
            })
        }
    }

})('../');


