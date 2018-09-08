(function (rootPath) {
    'use strict';

    angular
        .module('app.barCodeManage')
        .service('barCodeManageAddService', barCodeManageAddService);
    barCodeManageAddService.$inject = ['$http'];

    /* @ngInject */
    function barCodeManageAddService($http) {
        this.saveBarCodeManage = saveBarCodeManage;
        this.loadbarCodeManage = loadbarCodeManage;

        /*新增*/
        function saveBarCodeManage(params) {
            return $http({
                url: rootPath + "Cf_goods_bar_code/save.do",
                method: 'post',
                data: params
            })
        }

        /*加载商品条码详细信息*/
        function loadbarCodeManage(params) {
            return $http({
                url: rootPath + "Cf_goods_bar_code/loadbarCodeManage",
                method: 'get',
                params: params
            })
        }
    }

})('../');


