(function (rootPath) {
    'use strict';

    angular
        .module('app.dataList')
        .service('showViewService', showViewService);
    showViewService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function showViewService($http, SYSTEM) {}

})('../');


