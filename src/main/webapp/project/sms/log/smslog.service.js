
(function (rootPath) {
    'use strict';

    angular
        .module('app.smslog')
        .service('smslogService', smslogService);
    smslogService.$inject = ['$http'];
    /* @ngInject */
    function smslogService($http) {
        this.loadSmslogList = function (params) {
            return $http({
                url: rootPath + "T_sms/list",
                method: 'get',
                params: params
            })
        };

        this.deleteSmslog = function (params) {
            return $http({
                url: rootPath + "T_sms/DestroyList",
                method: 'post',
                data: params
            })
        };


    }






})('../');


