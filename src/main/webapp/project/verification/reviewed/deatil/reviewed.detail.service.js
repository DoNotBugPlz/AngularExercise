(function (rootPath) {
    'use strict';

    angular
        .module('app.reviewed')
        .service('revieweddetailservice', revieweddetailservice);
    revieweddetailservice.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function revieweddetailservice($http, SYSTEM) {
        this.loadReviewed = loadReviewed;
        this.saveReviewed = saveReviewed;
        function loadReviewed(params) {
            return $http({
                url: rootPath + "T_matter/loadMatter.do",
                method: 'get',
                params: params
            })
        }
        function saveReviewed(params) {
            return $http({
                url: rootPath + "T_matter/save.do",
                method: 'post',
                data:params
            })
        }




    }



})('../');


