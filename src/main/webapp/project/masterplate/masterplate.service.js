(function (rootPath) {
    'use strict';

    angular
        .module('app.masterplate')
        .service('masterplateService', masterplateService);
    masterplateService.$inject = ['$http'];
    /* @ngInject */
    function masterplateService($http) {
        this.changeStatue = changeStatue;

        //加载列表数据
        this.loadMasterplateList = function (params) {
            return $http({
                url: rootPath + "T_masterplate/list",
                method: 'get',
                params: params
            })
        };

        //删除
        this.deleteExchange = function (params) {
            return $http({
                url: rootPath + "T_exchange_info/list/del",
                method: 'post',
                data: params
            })
        };

        function changeStatue(params) {
            return $http({
                url: rootPath + "T_masterplate/changeStatue.do",
                method: 'POST',
                data: params
            })
        }


    }

})('../');


