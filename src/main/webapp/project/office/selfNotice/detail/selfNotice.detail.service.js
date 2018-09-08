(function (rootPath) {
    'use strict';

    angular
        .module('app.office')
        .service('selfNoticeDetailService', selfNoticeDetailService);
    selfNoticeDetailService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function selfNoticeDetailService($http, SYSTEM) {
        this.loadNotice = loadNotice;

        function loadNotice(params) {
            return $http({
                url: rootPath + "T_notice/loadNotice.do",
                method: 'get',
                params: params
            });
        };
    }

})('../');


