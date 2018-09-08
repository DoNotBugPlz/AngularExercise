/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function (rootPath) {
    'use strict';

    angular
        .module('app.querymonitordatalower')
        .service('querymonitordatalowerDetailService', querymonitordatalowerDetailService);
    querymonitordatalowerDetailService.$inject = ['$http'];

    /* @ngInject */
    function querymonitordatalowerDetailService($http) {
        this.login = function (params) {
            return $http({
                url: "http://32.1.0.33:37799/WebReport/ReportServer",
                servertypefinebI: true,
                method: 'get',
                params: params
            });
        };
        this.create=function (params) {
            return $http({
                url: "http://32.1.0.33:37799/WebReport/ReportServer",
                servertypefinebI: true,
                method: 'get',
                params: params
            });
        };
    }
})('../');


