/**
 * @author maxzhao
 * @time 2018/08/21.
 */
(function (rootPath) {
    'use strict';
    angular
        .module('app.office')
        .service('officeService', officeService);
    officeService.$inject = ['$http'];

    /* @ngInject */
    function officeService($http) {
        this.saveNotice = saveNotice;
        this.loadNoticeList = function (params) {
            return $http({
                url: rootPath + "T_notice/list",
                method: 'get',
                params: params
            })
        };

        this.delNoticeList = function (params) {
            return $http({
                url: rootPath + "T_notice/list/del",
                method: 'post',
                data: params
            })
        };

        /*新增或修改通知*/
        function saveNotice(params) {
            return $http({
                url: rootPath + "T_notice/save.do",
                method: 'post',
                data: params
            })
        }

        this.loadNotice = function (params) {
            return $http({
                url: rootPath + "T_notice/loadNotice.do",
                method: 'get',
                params: params
            })
        }
    }
})('../');
