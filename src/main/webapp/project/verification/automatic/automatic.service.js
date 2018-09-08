
(function (rootPath) {
    'use strict';

    angular
        .module('app.automatic')
        .service('automaticService', automaticService);
    automaticService.$inject = ['$http'];
    /* @ngInject */
    function automaticService($http) {
        this.loadSmsList = function (params) {
            return $http({
                url: rootPath + "T_sms/list",
                method: 'get',
                params: params
            })
        };
        this.deleteSms = function (params) {
            return $http({
                url: rootPath + "T_sms/DestroyList",
                method: 'post',
                data: params
            })
        };



    }

})('../');


