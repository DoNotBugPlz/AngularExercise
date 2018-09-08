(function (rootPath) {
    'use strict';

    angular
        .module('app.masterplate')
        .service('MonitorTableService', MonitorTableService);
    MonitorTableService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function MonitorTableService($http, SYSTEM) {
    }

})('../');


