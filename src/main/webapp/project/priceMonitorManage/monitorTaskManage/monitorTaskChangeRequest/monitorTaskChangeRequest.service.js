
(function (rootPath) {
    'use strict';

    angular
        .module('app.monitorTaskChangeRequest')
        .service('monitorTaskChangeRequestService', monitorTaskChangeRequestService);
    monitorTaskChangeRequestService.$inject = ['$http'];
    /* @ngInject */
    function monitorTaskChangeRequestService($http) {

        this.loadChangeTask = loadChangeTask;
        function loadChangeTask(params){
            return $http({
                url: rootPath + "T_task/loadTaskList.do",
                method: 'GET',
                params:params
            })

        }

        this.loadMonitorTaskChangeRequest = function (params) {
            return $http({
                url: rootPath + "T_monitorTaskChangeRequest/LoadObj.do",
                method: 'get',
                params: params
            })
        }
        this.saveMonitorTaskChangeRequest = function (params) {
            return $http({
                url: rootPath + "T_monitorTaskChangeRequest/Save.do",
                method: 'post',
                data: params
            })
        }


    }




})('../');


