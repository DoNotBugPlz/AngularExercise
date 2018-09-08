(function (rootPath) {
    'use strict';

    angular
        .module('app.helpFill')
        .service('ReportUnitService', ReportUnitService);
    ReportUnitService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function ReportUnitService($http, SYSTEM) {
    }

})('../');


