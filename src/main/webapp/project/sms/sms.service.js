
(function (rootPath) {
    'use strict';

    angular
        .module('app.sms')
        .service('smsService', smsService);
    smsService.$inject = ['$http'];
    /* @ngInject */
    function smsService($http) {
        this.loadSmsList = function (params) {
            return $http({
                url: rootPath + "T_sms/list",
                method: 'get',
                params: params
            })
        };
        this.deleteSms = function (params) {
            return $http({
                url: rootPath + "T_sms/DestroyList",
                method: 'post',
                data: params
            })
        };



    }

})('../');


