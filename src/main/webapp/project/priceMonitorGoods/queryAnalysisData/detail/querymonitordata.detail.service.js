/**
 * @author maxzhao
 * @time 2018/08/23.
 */
(function (rootPath) {
    'use strict';

    angular
        .module('app.querymonitordata')
        .service('querymonitordataDetailService', querymonitordataDetailService);
    querymonitordataDetailService.$inject = ['$http'];

    /* @ngInject */
    function querymonitordataDetailService($http) {
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


