/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.smslog')
        .controller('SmslogCtrl', SmslogCtrl);
    SmslogCtrl.$inject = ['$scope','$stateParams','smslogService','pageInfDefault','ngDialog','_','$window'];
    /* @ngInject */
    function SmslogCtrl($scope,$stateParams,smslogService,pageInfDefault,ngDialog,_,$window) {
        var vm = this;
        window.a = vm;
        vm.delSmslogPl = delSmslogPl;
        vm.deleteSmslog = deleteSmslog;
        vm.loadSmslogList = loadSmslogList;
        vm.viewSmslog=viewSmslog
        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        vm.clearSearchParams = clearSearchParams;

        function selectAll(dateList) {
            vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(dateList)){
                _.forEach(dateList,function (item) {
                    item.selected=vm.allSelected;
                })
            }
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
        var setSmslogList = setSmslogList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        ////////////////
        function activate() {
            loadSmslogList();
        }
        function clearSearchParams(){
            vm.searchParams = {};
        }

        function deleteSmslog(obj) {
            delSmslogOp(obj.id);
        }
        function loadSmslogList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            smslogService.loadSmslogList(params)
                .then(function(response){
                    setSmslogList(response,params.pageNumber)
                });
        }
        //刷新列表
        function refreshList() {
            loadSmslogList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setSmslogList(response,pageNum) {
            var result = response.data;
            vm.smslogList = result.rows;
            vm.smslogListPage = angular.extend({pageTurn: 'loadSmslogList',pagenum:pageNum}, result);
        }

        function delSmslogPl() {

            delSmslogOp(getAllSelectId(vm.smslogList).join(","));
        }

        function delSmslogOp(objIds) {
            if(angular.isUndefined(objIds)||objIds===''){
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？",function () {

                var params= {"ids":objIds};
                smslogService.deleteSmslog(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }

        function viewSmslog(sms){
            opSms("查看日志", {"sms_id": sms.id,"is_view":true});
        }
            function opSms(title, params) {
                ngDialog.open({
                    title: title,
                    template: "sms/detail/sms.detail.html",
                    height: '600px',
                    width: '1400px',
                    controller: 'smsDetailCtrl as vm',
                    data: params,
                    resolve: {
                        loadSmsDetailFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './sms/detail/sms.detail.controller.js',
                                './sms/detail/sms.detail.service.js',
                                'ng-zTree',
                                'My97DatePicker'
                            ]);
                        }
                    },
                    preCloseCallback: function () {
                        refreshList();
                    }
                });
        }

        //执行方法
        activate();


    }

})();

