
(function (rootPath) {
    'use strict';

    angular
        .module('app.smslog')
        .service('smsmonitorService', smsmonitorService);
    smsmonitorService.$inject = ['$http'];
    /* @ngInject */
    function smsmonitorService($http) {
        this.loadSmsMonitorList = function (params) {
            return $http({
                url: rootPath + "T_sms_server_monitor/list",
                method: 'get',
                params: params
            })
        };

        this.updateStatus = function (params) {

            return $http({
                url: rootPath + "T_sms_server_monitor/updateStatus",
                method: 'post',
                data: params
            })
        };


    }






})('../');


