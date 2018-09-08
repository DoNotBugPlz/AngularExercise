/**
 * @author maxzhao
 * @time 2018/08/21.
 */
(function (rootPath) {
    'use strict';
    angular
        .module('app.interactionmsg')
        .service('interactionmsgService', interactionmsgService);
    interactionmsgService.$inject = ['$http'];

    /* @ngInject */
    function interactionmsgService($http) {

    }
})('../');
