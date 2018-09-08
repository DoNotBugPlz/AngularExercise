
(function (rootPath) {
    'use strict';

    angular
        .module('app.monitorTaskManage')
        .service('addMonitorIndicatorsService', addMonitorIndicatorsService);
    addMonitorIndicatorsService.$inject = ['$http'];
    /* @ngInject */
    function addMonitorIndicatorsService($http) {


        this.getIndexListByParam = getIndexListByParam;



        function getIndexListByParam(params) {
            return $http({
                url: rootPath + "Cf_index/getIndexListByParam.do",
                method: 'GET',
                params: params
            })
        }


    }

})('../');


