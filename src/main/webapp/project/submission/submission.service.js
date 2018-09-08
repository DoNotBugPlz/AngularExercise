(function (rootPath) {
    'use strict';

    angular
        .module('app.submission')
        .service('submissionService', submissionService);
    submissionService.$inject = ['$http'];
    /* @ngInject */
    function submissionService($http) {

        //加载列表数据
        this.loadSubmissionList = function (params) {
            return $http({
                url: rootPath + "T_material_info/submissionList",
                method: 'get',
                params: params
            })
        };
    }

})('../');


