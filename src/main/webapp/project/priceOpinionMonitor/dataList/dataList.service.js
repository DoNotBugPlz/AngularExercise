(function (rootPath) {
    'use strict';
    angular
        .module('app.dataList')
        .service('dataListService', dataListService);
    dataListService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function dataListService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


