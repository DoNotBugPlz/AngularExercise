(function (rootPath) {
    'use strict';
    angular
        .module('app.schemeManage')
        .service('schemeManageService', schemeManageService);
    schemeManageService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function schemeManageService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


