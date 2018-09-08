/**
 * Created by chencl on 2018/8/18
 * 采价员统计
 */
(function () {
    'use strict';

    angular
        .module('app.priceCollectorSign')
        .controller('PriceCollectorSignCtrl', PriceCollectorSignCtrl);
    PriceCollectorSignCtrl.$inject = ['$scope','$stateParams','priceCollectorSignService','pageInfDefault','coreService','ngDialog'];

    /* @ngInject */
    function PriceCollectorSignCtrl($scope,$stateParams,priceCollectorSignService,pageInfDefault,coreService,ngDialog) {
        var vm =this;
        vm.condition ={};
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        vm.clearAll = clearAll;
        vm.getList  = getList;
        window.aa = vm;
        activate();
        function activate() {
           getList()
        }

        function getList(pageNumber,pageSize) {
            var pageInfo = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInfo,vm.condition);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInfo);
            return priceCollectorSignService.getList(params).then(setList);
        }
        function setList(response,pageNum) {
            var result = response.data;
            vm.signList = result.rows;
            vm.signListPage = angular.extend({pageTurn: 'getList',pagenum:pageNum}, result);
        }
        function clearAll() {
            vm.condition = {}
        }
    }
})();

