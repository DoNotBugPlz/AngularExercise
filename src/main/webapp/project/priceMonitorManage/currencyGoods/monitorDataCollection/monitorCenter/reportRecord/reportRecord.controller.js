/**
 * Created by chencl on 2018/8/30
 * 待填报列表
 */
(function () {
    'use strict';

    angular
        .module('app.reportRecord')
        .controller('ReportRecordCtrl', ReportRecordCtrl);
    ReportRecordCtrl.$inject = ['$scope','$stateParams','reportRecordService','pageInfDefault','coreService','ngDialog'];

    /* @ngInject */
    function ReportRecordCtrl($scope,$stateParams,reportRecordService,pageInfDefault,coreService,ngDialog) {
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
            vm.signList = [{chinaname:'城市居民食品零售价格监测',site_name:"省级",col_datetime:'2018年4月18日',is_pub_text:"未审核",is_pub:"1"},
                {chinaname:'优质粮食收购价格监测',site_name:"市级",col_datetime:'2018年4月12日',is_pub_text:"审核中",is_pub:"0"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:2,
                rows:[{chinaname:'城市居民食品零售价格监测',site_name:"省级",col_datetime:'2018年4月18日',is_pub_text:"未审核",is_pub:"1"},
                    {chinaname:'优质粮食收购价格监测',site_name:"市级",col_datetime:'2018年4月12日',is_pub_text:"审核中",is_pub:"0"}
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
            return reportRecordService.getList(params).then(setList);
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

