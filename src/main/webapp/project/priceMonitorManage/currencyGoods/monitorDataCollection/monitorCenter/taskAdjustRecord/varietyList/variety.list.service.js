(function (rootPath) {
    'use strict';

    angular
        .module('app.taskAdjustRecord')
        .service('VarietyListService', VarietyListService);
    VarietyListService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function VarietyListService($http, SYSTEM) {

    }

})('../');


