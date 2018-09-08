(function (rootPath) {
    'use strict';
    angular
        .module('app.priceCollectorSign')
        .service('priceCollectorSignService', priceCollectorSignService);
    priceCollectorSignService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function priceCollectorSignService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


