(function (rootPath) {
    'use strict';
    angular
        .module('app.backEdit')
        .service('backEditService', backEditService);
    backEditService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function backEditService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


