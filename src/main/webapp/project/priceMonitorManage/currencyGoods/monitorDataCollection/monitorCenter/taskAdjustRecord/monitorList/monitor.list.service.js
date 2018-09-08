(function (rootPath) {
    'use strict';

    angular
        .module('app.taskAdjustRecord')
        .service('MonitorListService', MonitorListService);
    MonitorListService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function MonitorListService($http, SYSTEM) {
    }

})('../');


