(function (rootPath) {
    'use strict';
    angular
        .module('app.helpFill')
        .service('helpFillService', helpFillService);
    helpFillService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function helpFillService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


