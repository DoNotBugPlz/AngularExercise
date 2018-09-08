/**
 * Created by tr on 2018年8月22日10:45:41
 */
(function (rootPath) {
    'use strict';
    angular.module('app.lw')
        .service('lwService',lwService);
    lwService.$inject = ['$http','SYSTEM'];

    function lwService($http,SYSTEM) {

        this.loadLwlList = loadLwlList;
        function loadLwlList(params) {
            return $http({
                url: rootPath + "Oa_lw/LoadLwList",
                method: 'get',
                params: params
            })

        }




    }

})('../');