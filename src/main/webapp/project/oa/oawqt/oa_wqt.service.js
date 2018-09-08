/**
 * Created by tr on 2018年8月22日10:45:41
 */
(function (rootPath) {
    'use strict';
    angular.module('app.wqt')
        .service('wqtService',wqtService);
    wqtService.$inject = ['$http','SYSTEM'];

    function wqtService($http,SYSTEM) {
        this.loadWqtlList = loadWqtlList;

        function loadWqtlList(params) {
            return $http({
                url: rootPath + "Oa_wqt/LoadWqtList",
                method: 'get',
                params: params
            })
        };






    }

})('../');