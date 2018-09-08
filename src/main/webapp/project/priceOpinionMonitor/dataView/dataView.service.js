(function (rootPath) {
    'use strict';
    angular
        .module('app.dataView')
        .service('dataViewService', dataViewService);
    dataViewService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function dataViewService($http,SYSTEM) {
       
    }
})('../');


