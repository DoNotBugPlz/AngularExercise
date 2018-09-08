(function (rootPath) {
    'use strict';

    angular
        .module('app.masterplate')
        .service('addGoodsService', addGoodsService);
    addGoodsService.$inject = ['$http'];

    /* @ngInject */
    function addGoodsService($http) {
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


