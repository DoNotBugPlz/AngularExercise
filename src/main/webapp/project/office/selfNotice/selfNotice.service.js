(function (rootPath) {
    'use strict';

    angular
        .module('app.office')
        .service('selfNoticeService', selfNoticeService);
    selfNoticeService.$inject = ['$http'];

    /* @ngInject */
    function selfNoticeService($http) {
        this.selectNotice = selectNotice;
        /*读取通知*/
        this.readNotices = readNotices;
        this.loadNoticeList = loadNoticeList;

        function loadNoticeList(params) {
            return $http({
                url: rootPath + "T_notice_read/list/self",
                method: 'get',
                params: params
            });
        };

        function selectNotice(params) {
            return $http({
                url: rootPath + "T_notice/select.do",
                method: 'post',
                data: params
            });
        };

        function readNotices(params) {
            return $http({
                url: rootPath + 'T_notice_read/list/is_read.do',
                method: 'GET',
                params: params
            });
        };
    }

})('../');


