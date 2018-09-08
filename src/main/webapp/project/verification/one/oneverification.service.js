
(function (rootPath) {
    'use strict';

    angular
        .module('app.oneverification')
        .service('oneverificationService', oneverificationService);
    oneverificationService.$inject = ['$http'];
    /* @ngInject */
    function oneverificationService($http) {
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


