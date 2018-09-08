
(function (rootPath) {
    'use strict';

    angular
        .module('app.auditor')
        .service('auditorService', auditorService);
    auditorService.$inject = ['$http'];
    /* @ngInject */
    function auditorService($http) {
        this.loadAuditorList = function (params) {
            return $http({
                url: rootPath + "T_matter/list",
                method: 'get',
                params: params
            })
        };
        this.deleteMatter = function (params) {
            return $http({
                url: rootPath + "T_matter/DestroyList",
                method: 'post',
                data: params
            })
        };



    }

})('../');


