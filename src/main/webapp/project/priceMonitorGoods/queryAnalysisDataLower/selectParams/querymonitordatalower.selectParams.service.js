/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function (rootPath) {
    'use strict';

    angular
        .module('app.querymonitordatalower')
        .service('querymonitordatalowerSelectParamsService', querymonitordatalowerSelectParamsService);
    querymonitordatalowerSelectParamsService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function querymonitordatalowerSelectParamsService($http, SYSTEM) {


    }
})('../');


