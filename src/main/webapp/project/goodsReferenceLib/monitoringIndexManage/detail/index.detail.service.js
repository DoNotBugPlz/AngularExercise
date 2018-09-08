(function (rootPath) {
    'use strict';

    angular
        .module('app.monitoringIndexManage')
        .service('IndexDetailService', IndexDetailService);
    IndexDetailService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function IndexDetailService($http, SYSTEM) {
        this.loadIndexDetail = loadIndexDetail;
        this.saveOrUpdateIndex = saveOrUpdateIndex;

        function loadIndexDetail(params) {
            return $http({
                url: rootPath + "Cf_index/getIndexDetail",
                method: 'get',
                params: params
            })
        }
        function saveOrUpdateIndex(params) {
            return $http({
                url: rootPath + "Cf_index/saveOrUpdateIndex",
                method: 'POST',
                data: params
            })
        }

    }

})('../');


