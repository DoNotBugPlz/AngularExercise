(function (rootPath) {
    'use strict';
    angular
        .module('app.toFillPresentList')
        .service('toFillPresentListService', toFillPresentListService);
    toFillPresentListService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function toFillPresentListService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


