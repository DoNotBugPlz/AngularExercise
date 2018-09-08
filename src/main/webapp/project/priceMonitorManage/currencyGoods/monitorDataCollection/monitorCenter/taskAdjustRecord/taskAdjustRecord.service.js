(function (rootPath) {
    'use strict';
    angular
        .module('app.taskAdjustRecord')
        .service('taskAdjustRecordService', taskAdjustRecordService);
    taskAdjustRecordService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function taskAdjustRecordService($http,SYSTEM) {
        this.getList = function (params) {
            return $http({
                url: rootPath + "Cf_user_sign/getListByParam.do",
                method: 'GET',
                params: params
            })
        };
    }
})('../');


