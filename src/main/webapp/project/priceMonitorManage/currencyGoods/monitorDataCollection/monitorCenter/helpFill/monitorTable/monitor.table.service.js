(function (rootPath) {
    'use strict';

    angular
        .module('app.helpFill')
        .service('MonitorTableService', MonitorTableService);
    MonitorTableService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function MonitorTableService($http, SYSTEM) {
    }

})('../');


