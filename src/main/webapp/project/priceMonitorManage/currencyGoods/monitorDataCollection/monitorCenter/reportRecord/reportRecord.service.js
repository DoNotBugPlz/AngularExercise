(function (rootPath) {
    'use strict';
    angular
        .module('app.reportRecord')
        .service('reportRecordService', reportRecordService);
    reportRecordService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function reportRecordService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


