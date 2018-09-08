/**
 * @author maxzhao
* @time 2018/09/05.
 */
(function (rootPath) {
    'use strict';

    angular
        .module('app.querymonitordatashare')
        .service('querymonitordatashareSelectParamsService', querymonitordatashareSelectParamsService);
    querymonitordatashareSelectParamsService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function querymonitordatashareSelectParamsService($http, SYSTEM) {


    }
})('../');


