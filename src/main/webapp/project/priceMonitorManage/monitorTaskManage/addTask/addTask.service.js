
(function (rootPath) {
    'use strict';

    angular
        .module('app.monitorTaskManage')
        .service('addTaskService', addTaskService);
    addTaskService.$inject = ['$http'];
    /* @ngInject */
    function addTaskService($http) {




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


