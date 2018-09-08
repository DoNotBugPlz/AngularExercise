(function (rootPath) {
    'use strict';

    angular
        .module('app.masterplate')
        .service('trendService', trendService);
    trendService.$inject = ['$http'];

    /* @ngInject */
    function trendService($http) {
        this.loadTrendList = loadTrendList;

        function loadTrendList(params) {
            return $http({
                url: rootPath + "T_masterplate_index/list.do",
                method: 'get',
                params: params
            })
        }

        //删除
        this.delTrend = function (params) {
            return $http({
                url: rootPath + "T_masterplate_index/del",
                method: 'post',
                data: params
            })
        };
    }

})('../');


