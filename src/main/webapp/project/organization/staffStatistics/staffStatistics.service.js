/**
 * @author maxzhao
 * @time 2018/08/17.
 */
(function (rootPath) {
    'use strict';

    angular
        .module('app.staffstatistics')
        .service('StaffStatisticsService', StaffStatisticsService);
    StaffStatisticsService.$inject = ['$http'];
    /* @ngInject */
    function StaffStatisticsService($http) {

    }

})('../');


