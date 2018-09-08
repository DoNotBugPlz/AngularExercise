(function (rootPath) {
    'use strict';
    angular
        .module('app.dataImport')
        .service('dataImportService', dataImportService);
    dataImportService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function dataImportService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


