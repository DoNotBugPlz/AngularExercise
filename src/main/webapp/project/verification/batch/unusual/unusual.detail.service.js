(function (rootPath) {
    'use strict';

    angular
        .module('app.batch')
        .service('unusualDetailService', unusualDetailService);
    unusualDetailService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function unusualDetailService($http, SYSTEM) {
        this.loadUnusual = loadUnusual;
        function loadUnusual(params) {
            return $http({
                url: rootPath + "T_sms/loadSms.do",
                method: 'get',
                params: params
            })
        }

    }



})('../');


