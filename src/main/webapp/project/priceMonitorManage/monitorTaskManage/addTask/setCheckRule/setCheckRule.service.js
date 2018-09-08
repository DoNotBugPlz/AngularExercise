
(function (rootPath) {
    'use strict';

    angular
        .module('app.monitorTaskManage')
        .service('setCheckRuleService', setCheckRuleService);
    setCheckRuleService.$inject = ['$http'];
    /* @ngInject */
    function setCheckRuleService($http) {


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


