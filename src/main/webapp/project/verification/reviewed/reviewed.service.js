
(function (rootPath) {
    'use strict';

    angular
        .module('app.reviewed')
        .service('reviewedService', reviewedService);
    reviewedService.$inject = ['$http'];
    /* @ngInject */
    function reviewedService($http) {
        this.loadReviewedList = function (params) {
            return $http({
                url: rootPath + "T_sms/list",
                method: 'get',
                params: params
            })
        };
        this.deleteSms = function (params) {
            return $http({
                url: rootPath + "T_sms/DestroyList",
                method: 'post',
                data: params
            })
        };



    }

})('../');


