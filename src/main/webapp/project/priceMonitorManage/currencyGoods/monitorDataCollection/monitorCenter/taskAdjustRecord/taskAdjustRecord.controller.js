/**
 * Created by chencl on 2018/8/30
 * 待填报列表
 */
(function () {
    'use strict';

    angular
        .module('app.taskAdjustRecord')
        .controller('TaskAdjustRecordCtrl', TaskAdjustRecordCtrl);
    TaskAdjustRecordCtrl.$inject = ['$scope','$stateParams','taskAdjustRecordService','pageInfDefault','coreService','ngDialog','$window'];

    /* @ngInject */
    function TaskAdjustRecordCtrl($scope,$stateParams,taskAdjustRecordService,pageInfDefault,coreService,ngDialog,$window) {
        var vm =this;
        vm.condition ={};
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        vm.clearAll = clearAll;
        vm.getList  = getList;
        vm.openIndex = openIndex;
        window.aa = vm;
        activate();
        function activate() {
           // getList()
            vm.signList = [{chinaname:'城市居民食品零售价格监测',col_datetime:'2018年4月18日',actual_sign_nums:'2018-4-18 09:00-17:00',is_pub_text:"待填报",is_pub:"1"},
                {chinaname:'优质粮食收购价格监测',col_datetime:'2018年4月12日',actual_sign_nums:'2018-4-9 09:00- 2018-4-12 17:00',is_pub_text:"暂存",is_pub:"0"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:2,
                rows:[{chinaname:'城市居民食品零售价格监测',col_datetime:'2018年4月18日',actual_sign_nums:'2018-4-18 09:00-17:00',is_pub_text:"待填报",is_pub:"1"},
                    {chinaname:'优质粮食收购价格监测',col_datetime:'2018年4月12日',actual_sign_nums:'2018-4-9 09:00- 2018-4-12 17:00',is_pub_text:"暂存",is_pub:"0"}
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
            return taskAdjustRecordService.getList(params).then(setList);
        }
        function setList(response,pageNum) {
            var result = response.data;
            vm.signList = result.rows;
            vm.signListPage = angular.extend({pageTurn: 'getList',pagenum:pageNum}, result);
        }
        function clearAll() {
            vm.condition = {}
        }

        function openIndex(title,params){
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            ngDialog.open({
                title: '任务调整',
                template:'./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/adjustDetail/adjust.detail.html',
                height:'550px',
                width:'800px',
                controller:'AdjustDetailCtrl as vm',
                data:params,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/adjustDetail/adjust.detail.controller.js',
                            './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/adjustDetail/adjust.detail.service.js',
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    // refreshList();
                }
            });
        }
    }
})();

