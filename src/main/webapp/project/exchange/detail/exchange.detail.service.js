(function (rootPath) {
    'use strict';

    angular
        .module('app.exchange')
        .service('exchangeDetailService', exchangeDetailService);
    exchangeDetailService.$inject = ['$http'];

    /* @ngInject */
    function exchangeDetailService($http) {
        this.loadExchange = loadExchange;
        this.saveExchange = saveExchange;
        this.answerExchange = answerExchange;

        function loadExchange(params) {
            return $http({
                url: rootPath + "T_exchange_info/loadExchange.do",
                method: 'get',
                params: params
            })
        }

        /*新增*/
        function saveExchange(params) {
            return $http({
                url: rootPath + "T_exchange_info/save.do",
                method: 'post',
                data: params
            })
        }

        /*回复*/
        function answerExchange(params) {
            return $http({
                url: rootPath + "T_exchange_info/answer.do",
                method: 'post',
                data: params
            })
        }


    }

})('../');


