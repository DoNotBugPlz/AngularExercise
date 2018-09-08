
(function (rootPath) {
    'use strict';

    angular
        .module('app.monitorTaskManage')
        .service('monitorTaskManagerService', monitorTaskManagerService);
    monitorTaskManagerService.$inject = ['$http'];
    /* @ngInject */
    function monitorTaskManagerService($http) {
        this.loadTaskList = loadTaskList;



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


    }

})('../');


