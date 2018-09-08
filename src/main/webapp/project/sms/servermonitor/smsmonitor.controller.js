/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.smslog')
        .controller('SmsMonitorCtrl', SmsMonitorCtrl);
    SmsMonitorCtrl.$inject = ['$scope','$stateParams','smsmonitorService','coreService','pageInfDefault','ngDialog','_','$window'];
    /* @ngInject */
    function SmsMonitorCtrl($scope,$stateParams,smsmonitorService,coreService,pageInfDefault,ngDialog,_,$window) {
        var vm = this;
        vm.loadSmsMonitorList = loadSmsMonitorList;
        vm.StopSmsMonitor = StopSmsMonitor;
        vm.EndSmsMonitor = EndSmsMonitor;

        vm.clearSearchParams = clearSearchParams;
        // vm.updateStatus = updateStatus;
        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        function selectAll(dateList) {
            vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(dateList)){
                _.forEach(dateList,function (item) {
                    item.selected=vm.allSelected;
                })
            }
        }

        function clearSearchParams(){
            vm.searchParams = {};
        }

        function selectItem(item) {
            item.selected=!item.selected;
        }
        function getAllSelectId(dataList) {
            return _.map(_.filter(dataList,function (item) {
                return item.selected;
            }),function (item) {
                return item.id;
            });
        }
        /***批量选择控制**/
        var setSmsMonitorList = setSmsMonitorList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        ////////////////
        function activate() {
            loadSmsMonitorList();
            //预警
            coreService.getCategoryValues('EARLYS_STATUS')
                .then(setCategoryValues);

            coreService.getCategoryValues('SERVER_STATUS')
                .then(setCategoryValues1);
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.clattachstatusCatagory = coreService.covertCategoryValueIdToInt(result["EARLYS_STATUS"]);
        }

        function setCategoryValues1(response) {
            var result = response.data;
            vm.clattachstatusCatagory1 = coreService.covertCategoryValueIdToInt(result["SERVER_STATUS"]);
        }


        //停用
        function StopSmsMonitor(obj) {
            var params= {"ids":obj.id,
                          "status":"1"
            };
            smsmonitorService.updateStatus(params)
                .then(function(){
                    refreshList();
                });
        }
        //启用
        function  EndSmsMonitor(obj) {
            var params= {"ids":obj.id,
                "status":"0"
            };
            smsmonitorService.updateStatus(params)
                .then(function(){
                    refreshList();
                });
            
        }

        function loadSmsMonitorList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            smsmonitorService.loadSmsMonitorList(params)
                .then(function(response){
                    setSmsMonitorList(response,params.pageNumber)
                });
        }
        //刷新列表
        function refreshList() {
            loadSmsMonitorList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setSmsMonitorList(response,pageNum) {
            var result = response.data;
            vm.smsMonitorList = result.rows;
            vm.smsMonitorListPage = angular.extend({pageTurn: 'loadSmsMonitorList',pagenum:pageNum}, result);
        }
        //执行方法
        activate();
    }

})();

