
(function (rootPath) {
    'use strict';

    angular
        .module('app.demo')
        .service('demoDetailService', demoDetailService);
    demoDetailService.$inject = ['$http'];
    /* @ngInject */
    function demoDetailService($http) {
        this.loadDemo = function (params) {
            return $http({
                url: rootPath + "T_demo/LoadObj.do",
                method: 'get',
                params: params
            })
        }
        this.saveDemo = function (params) {
            return $http({
                url: rootPath + "T_demo/Save.do",
                method: 'post',
                data: params
            })
        }
    }

})('../');


