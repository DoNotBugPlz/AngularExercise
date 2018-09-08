
(function (rootPath) {
    'use strict';

    angular
        .module('app.monitorTaskManage')
        .service('addMonitorGoodsService', addMonitorGoodsService);
    addMonitorGoodsService.$inject = ['$http'];
    /* @ngInject */
    function addMonitorGoodsService($http) {


        this.loadGoodsListForMonitor = loadGoodsListForMonitor;


        function loadTaskList(params) {
            return $http({
                url: rootPath + "T_task/loadTaskList.do",
                method: 'GET',
                params:params
            })
        }


        function changeStatue(params) {
            return $http({
                url: rootPath + "Cf_goods/changeStatue.do",
                method: 'POST',
                data: params
            })
        }
        function loadGoodsListForMonitor(params) {
            return $http({
                url: rootPath + "Cf_goods/loadGoodsListForMonitor.do",
                method: 'GET',
                params: params
            })
        }


    }

})('../');


