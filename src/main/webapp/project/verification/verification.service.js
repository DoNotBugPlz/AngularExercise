
(function (rootPath) {
    'use strict';

    angular
        .module('app.verification')
        .service('verificationService', verificationService);
    verificationService.$inject = ['$http'];
    /* @ngInject */
    function verificationService($http) {
        this.loadverificationList = function (params) {
            return $http({
                url: rootPath + "T_sms/list",
                method: 'get',
                params: params
            })
        };
    }

})('../');


