(function (rootPath) {
    'use strict';

    angular
        .module('app.barCodeManage')
        .service('barCodeManageDetailService', barCodeManageDetailService);
    barCodeManageDetailService.$inject = ['$http'];

    /* @ngInject */
    function barCodeManageDetailService($http) {
        this.loadbarCodeManage = loadbarCodeManage;

        function loadbarCodeManage(params) {
            return $http({
                url: rootPath + "Cf_goods_bar_code/loadbarCodeManage",
                method: 'get',
                params: params
            })
        }

    }

})('../');


