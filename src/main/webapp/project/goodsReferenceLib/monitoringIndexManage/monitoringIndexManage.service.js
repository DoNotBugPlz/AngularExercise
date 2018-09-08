(function (rootPath) {
    'use strict';

    angular
        .module('app.monitoringIndexManage')
        .service('monitoringIndexManageService', monitoringIndexManageService);
    monitoringIndexManageService.$inject = ['$http'];
    /* @ngInject */
    function monitoringIndexManageService($http) {
        this.loadIndexList = loadIndexList;
        this.updateIndex = updateIndex;
        this.loadIndexTree = loadIndexTree;

        /*新增或修改通知*/
        function loadIndexList(params) {
            return $http({
                url: rootPath + "Cf_index/getIndexListByParam",
                method: 'get',
                params: params
            })
        }

        /*新增或修改通知*/
        function updateIndex(params) {
            return $http({
                url: rootPath + "Cf_index/updateIndex",
                method: 'POST',
                data: params
            })
        }

        function loadIndexTree () {
            return $http({
                url: rootPath + "Cf_index/LoadPageListForConfig",
                method: 'get',
                params: {id:0}
            })
        }
    }

})('../');


