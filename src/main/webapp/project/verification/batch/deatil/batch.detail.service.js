(function (rootPath) {
    'use strict';

    angular
        .module('app.batch')
        .service('batchdetailservice', batchdetailservice);
    batchdetailservice.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function batchdetailservice($http, SYSTEM) {
        this.saveBatch = saveBatch;
        function saveBatch(params) {
            return $http({
                url: rootPath + "T_matter/save.do",
                method: 'post',
                data:params
            })
        }

    }

})('../');


