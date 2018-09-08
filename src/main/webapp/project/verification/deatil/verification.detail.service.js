(function (rootPath) {
    'use strict';

    angular
        .module('app.verification')
        .service('verificationdetailservice', verificationdetailservice);
    verificationdetailservice.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function verificationdetailservice($http, SYSTEM) {
        this.loadverification = loadverification;
        this.saveVerification = saveVerification;

        function loadverification(params) {

            return $http({
                url: rootPath + "T_matter/loadMatter.do",
                method: 'get',
                params: params
            })
        }

        function saveVerification(params) {
            return $http({
                url: rootPath + "T_matter/save.do",
                method: 'post',
                data:params
            })
        }

    }

})('../');


