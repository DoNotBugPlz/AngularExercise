
(function (rootPath) {
    'use strict';

    angular
        .module('app.dept')
        .service('deptSelectService', deptSelectService);
    deptSelectService.$inject = ['$http'];
    /* @ngInject */
    function deptSelectService($http) {
        this.loadDeptTree = function () {
            return $http({
                url: rootPath + "Sys_dept/LoadListDeptTree.do",
                method: 'GET'
            })
        }
    }

})('../');


