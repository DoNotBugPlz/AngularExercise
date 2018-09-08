(function (rootPath) {
    'use strict';

    angular
        .module('app.exchange')
        .service('exchangeService', exchangeService);
    exchangeService.$inject = ['$http'];
    /* @ngInject */
    function exchangeService($http) {

        //加载列表数据
        this.loadExchangeList = function (params) {
            return $http({
                url: rootPath + "T_exchange_info/list",
                method: 'get',
                params: params
            })
        };

        //删除
        this.deleteExchange = function (params) {
            return $http({
                url: rootPath + "T_exchange_info/list/del",
                method: 'post',
                data: params
            })
        };


    }

})('../');


