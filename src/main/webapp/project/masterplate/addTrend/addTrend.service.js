(function (rootPath) {
    'use strict';

    angular
        .module('app.masterplate')
        .service('addTrendService', addTrendService);
    addTrendService.$inject = ['$http'];

    /* @ngInject */
    function addTrendService($http) {
        this.saveTrend = saveTrend;
        this.editTrend = editTrend;

        function editTrend(params) {
            return $http({
                url: rootPath + "T_masterplate_index/edit.do",
                method: 'post',
                data: params
            })
        }

        function saveTrend(params) {
            return $http({
                url: rootPath + "T_masterplate_index/save.do",
                method: 'post',
                data: params
            })
        }
    }

})('../');


