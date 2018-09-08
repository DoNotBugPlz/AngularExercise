
(function (rootPath) {
    'use strict';

    angular
        .module('app.demo')
        .service('demoService', demoService);
    demoService.$inject = ['$http'];
    /* @ngInject */
    function demoService($http) {
        this.loadDemoList = function (params) {
            return $http({
                url: rootPath + "T_demo/LoadList",
                method: 'get',
                params: params
            })
        };
        this.delDemoList = function (params) {
            return $http({
                url: rootPath + "T_demo/DestroyList",
                method: 'post',
                data: params
            })
        };
    }

})('../');


