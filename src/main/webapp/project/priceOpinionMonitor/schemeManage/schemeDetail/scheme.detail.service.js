(function (rootPath) {
    'use strict';

    angular
        .module('app.dataList')
        .service('SchemeDetailService', SchemeDetailService);
    SchemeDetailService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function SchemeDetailService($http, SYSTEM) {}

})('../');


