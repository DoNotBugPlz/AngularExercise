
(function (rootPath) {
    'use strict';

    angular
        .module('app.sensitive')
        .service('sensitivewordsservice', sensitivewordsservice);
    sensitivewordsservice.$inject = ['$http'];
    /* @ngInject */
    function sensitivewordsservice($http) {
        this.loadsensitiveList = function (params) {
            return $http({
                url: rootPath + "T_sensitiveword/list",
                method: 'get',
                params: params
            })
        };
        this.deletesensitive = function (params) {
            return $http({
                url: rootPath + "T_sensitiveword/DestroyList",
                method: 'post',
                data: params
            })
        };

        this.updateStatus = function (params) {
            return $http({
                url: rootPath + "T_sensitiveword/updateStatus",
                method: 'post',
                data: params
            })
        };


    }

})('../');


