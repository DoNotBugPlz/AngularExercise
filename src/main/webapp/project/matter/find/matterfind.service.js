
(function (rootPath) {
    'use strict';

    angular
        .module('app.matterfind')
        .service('matterFindService', matterFindService);
    matterFindService.$inject = ['$http'];
    /* @ngInject */
    function matterFindService($http) {
        this.loadMatterFindList = function (params) {
            return $http({
                url: rootPath + "T_matter/listfind",
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


