(function (rootPath) {
    'use strict';

    angular
        .module('app.batch')
        .service('priceDetailService', priceDetailService);
    priceDetailService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function priceDetailService($http, SYSTEM) {
        this.loadPrice = loadPrice;
        function loadPrice(params) {
            return $http({
                url: rootPath + "T_sms/loadSms.do",
                method: 'get',
                params: params
            })
        }


    }



})('../');


