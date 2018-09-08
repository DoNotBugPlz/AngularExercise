(function (rootPath) {
    'use strict';
    angular
        .module('app.reportPage')
        .service('reportPageService', reportPageService);
    reportPageService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function reportPageService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


