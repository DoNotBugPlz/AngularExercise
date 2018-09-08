(function (rootPath) {
    'use strict';

    angular
        .module('app.sms')
        .service('smsDetailService', smsDetailService);
    smsDetailService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function smsDetailService($http, SYSTEM) {
         this.loadSms = loadSms;
         this.saveSms = saveSms;

        function loadSms(params) {

            return $http({
                url: rootPath + "T_sms/loadSms.do",
                method: 'get',
                params: params
            })
        }

        function saveSms(params) {
            return $http({
                url: rootPath + "T_sms/save.do",
                method: 'post',
                data:params
            })
        }




    }



})('../');


