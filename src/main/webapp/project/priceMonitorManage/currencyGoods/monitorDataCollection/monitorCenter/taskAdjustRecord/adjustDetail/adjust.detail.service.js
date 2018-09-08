(function (rootPath) {
    'use strict';

    angular
        .module('app.taskAdjustRecord')
        .service('MonitorDetailService', MonitorDetailService);
    MonitorDetailService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function MonitorDetailService($http, SYSTEM) {
    }

})('../');


