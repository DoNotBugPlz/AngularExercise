/**
 * Created by chencl on 2018/8/30
 * 待填报列表
 */
(function () {
    'use strict';

    angular
        .module('app.toFillLowerList')
        .controller('ToFillLowerListCtrl', ToFillLowerListCtrl);
    ToFillLowerListCtrl.$inject = ['$scope','$stateParams','toFillLowerListService','pageInfDefault','coreService','ngDialog'];

    /* @ngInject */
    function ToFillLowerListCtrl($scope,$stateParams,toFillLowerListService,pageInfDefault,coreService,ngDialog) {
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
           // getList()
            vm.signList = [{chinaname:'城市居民食品零售价格监测',site_name:"浦口区价格监测中心",col_datetime:'2018年4月18日',actual_sign_nums:'2018-4-18 09:00-17:00',is_pub_text:"待填报",is_pub:"1"},
                {chinaname:'优质粮食收购价格监测',site_name:"浦口区价格监测中心",col_datetime:'2018年4月12日',actual_sign_nums:'2018-4-9 09:00- 2018-4-12 17:00',is_pub_text:"暂存",is_pub:"0"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:2,
                rows:[{chinaname:'城市居民食品零售价格监测',site_name:"浦口区价格监测中心",col_datetime:'2018年4月18日',actual_sign_nums:'2018-4-18 09:00-17:00',is_pub_text:"待填报",is_pub:"1"},
                    {chinaname:'优质粮食收购价格监测',site_name:"浦口区价格监测中心",col_datetime:'2018年4月12日',actual_sign_nums:'2018-4-9 09:00- 2018-4-12 17:00',is_pub_text:"暂存",is_pub:"0"}
                ]
            }
        }

        function getList(pageNumber,pageSize) {
            var pageInfo = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInfo,vm.condition);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInfo);
            return toFillLowerListService.getList(params).then(setList);
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

