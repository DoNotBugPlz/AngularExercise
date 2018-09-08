(function (rootPath) {
    'use strict';

    angular
        .module('app.barCodeManage')
        .service('barCodeManageService', barCodeManageService);
    barCodeManageService.$inject = ['$http'];
    /* @ngInject */
    function barCodeManageService($http) {
        this.saveBarCodeManage = saveBarCodeManage;

        this.loadBarCodeManageList = function (params) {
            return $http({
                url: rootPath + "Cf_goods_bar_code/list",
                method: 'get',
                params: params
            })
        };

        /*新增*/
        function saveBarCodeManage(params) {
            return $http({
                url: rootPath + "Cf_goods_bar_code/save.do",
                method: 'post',
                data: params
            })
        }
    }

})('../');


