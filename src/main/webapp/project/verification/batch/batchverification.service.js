
(function (rootPath) {
    'use strict';

    angular
        .module('app.batch')
        .service('bacthService', bacthService);
    bacthService.$inject = ['$http'];
    /* @ngInject */
    function bacthService($http) {

        this.loadBatchList = function (params) {
            return $http({
                url: rootPath + "T_sms/list",
                method: 'get',
                params: params
            })
        };

    }

})('../');


