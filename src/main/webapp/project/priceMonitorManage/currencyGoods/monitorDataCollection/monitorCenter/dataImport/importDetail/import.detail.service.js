(function (rootPath) {
    'use strict';

    angular
        .module('app.backEdit')
        .service('BackDetailService', BackDetailService);
    BackDetailService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function BackDetailService($http, SYSTEM) {}

})('../');


