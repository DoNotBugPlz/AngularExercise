
(function (rootPath) {
    'use strict';

    angular
        .module('app.matter')
        .service('matterService', matterService);
    matterService.$inject = ['$http'];
    /* @ngInject */
    function matterService($http) {
        this.loadMatterList = function (params) {
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


