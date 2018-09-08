/**
 * @author maxzhao
 * @time 2018/08/20.
 */
(function (rootPath) {
    'use strict';

    angular.module('app.institutions')
        .service('institutionsService', institutionsService);
    institutionsService.$inject = ['$http'];

    function institutionsService($http) {

    }
})('../');