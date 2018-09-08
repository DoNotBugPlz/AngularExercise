(function (rootPath) {
    'use strict';

    angular
        .module('app.matter')
        .service('matterdetailservice', matterdetailservice);
    matterdetailservice.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function matterdetailservice($http, SYSTEM) {
        this.loadMatter = loadMatter;
        this.saveMatter = saveMatter;

        function loadMatter(params) {

            return $http({
                url: rootPath + "T_matter/loadMatter.do",
                method: 'get',
                params: params
            })
        }

        function saveMatter(params) {
            return $http({
                url: rootPath + "T_matter/save.do",
                method: 'post',
                data:params
            })
        }




    }



})('../');


