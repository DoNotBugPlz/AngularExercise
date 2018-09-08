(function (rootPath) {
    'use strict';
    angular
        .module('app.toFillLowerList')
        .service('toFillLowerListService', toFillLowerListService);
    toFillLowerListService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function toFillLowerListService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


