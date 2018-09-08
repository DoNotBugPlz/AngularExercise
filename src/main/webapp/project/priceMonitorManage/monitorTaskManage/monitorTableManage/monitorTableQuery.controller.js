/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.monitorTableQuery')
        .controller('MonitorTableQueryCtrl', MonitorTableQueryCtrl);
    MonitorTableQueryCtrl.$inject = ['$scope','$stateParams','monitorTableQueryService','pageInfDefault','ngDialog','_','$window','coreService'];
    /* @ngInject */
    function MonitorTableQueryCtrl($scope,$stateParams,monitorTableQueryService,pageInfDefault,ngDialog,_,$window,coreService) {

        var vm = this;
        vm.addMonitorTableQuery = addMonitorTableQuery;
        vm.delMonitorTableQueryPl = delMonitorTableQueryPl;
        vm.editMonitorTableQuery = editMonitorTableQuery;
        vm.deleteMonitorTableQuery = deleteMonitorTableQuery;
        vm.loadMonitorTableQueryList = loadMonitorTableQueryList;
        vm.clearSearchParams = clearSearchParams;
        vm.advSearchFun = advSearchFun;
        vm.advSearch = false;
        function advSearchFun(){
            vm.advSearch=!vm.advSearch;
        }
        function clearSearchParams(){
            vm.searchParams = {};
        }
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
        var setMonitorTableQueryList = setMonitorTableQueryList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        ////////////////
        function activate() {
            coreService.getCategoryValues('YESNO')
                .then(setCategoryValues);
            loadMonitorTableQueryList();
        }
        function setCategoryValues(response ) {
            var result = response.data;
            console.log(result["YESNO"]);
            vm.yesnoCatagory= coreService.covertCategoryValueIdToInt(result["YESNO"]);

        }
        function addMonitorTableQuery() {
            opMonitorTableQuery("新增消息通知",{});
        }
        function editMonitorTableQuery(obj,opType) {
            opMonitorTableQuery("修改消息通知",{"monitorTableQueryId":obj.id,opType:opType});
        }
        function opMonitorTableQuery(title,params) {
            var height = $window.innerHeight;
            var width = $window.innerWidth;


            ngDialog.open({
                title: title,
                template:"monitorTableQuery/monitorTableQuery_list_form/detail/monitorTableQuery.detail.html",
                height:'450px',
                width:'800px',
                // height:height*0.9+'px',
                // width:width*0.9+'px',
                controller:'MonitorTableQueryDetailCtrl as vm',
                data:params,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './monitorTableQuery/monitorTableQuery_list_form/detail/monitorTableQuery.detail.controller.js',
                            './monitorTableQuery/monitorTableQuery_list_form/detail/monitorTableQuery.detail.service.js',
                            './utils/app.checkboxSel.js',
                            'My97DatePicker',
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    refreshList();
                }
            });
        }
        function deleteMonitorTableQuery(obj) {
            delMonitorTableQueryOp(obj.id);
        }
        function loadMonitorTableQueryList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            monitorTableQueryService.loadMonitorTableQueryList(params)
                .then(function(response){
                    setMonitorTableQueryList(response,params.pageNumber)
                });
        }
        //刷新列表
        function refreshList() {
            loadMonitorTableQueryList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setMonitorTableQueryList(response,pageNum) {
            var result = response.data;
            vm.monitorTableQueryList = result.rows;
            vm.monitorTableQueryListPage = angular.extend({pageTurn: 'loadMonitorTableQueryList',pagenum:pageNum}, result);
        }

        function delMonitorTableQueryPl() {
            delMonitorTableQueryOp(getAllSelectId(vm.monitorTableQueryList).join(","));
        }

        function delMonitorTableQueryOp(objIds) {
            if(angular.isUndefined(objIds)||objIds===''){
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？",function () {
                var params= {"ids":objIds};
                monitorTableQueryService.delMonitorTableQueryList(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }

        vm.opOffice = opOfficeTest;
        function opOfficeTest() {
            var title = "编辑正文";
            opOffice(title);

        }




        function opOffice(title,params) {
            ngDialog.open({
                title: title,
                template:"weboffice/weboffice.html",
                height:'700px',
                width:'1000px',
                controller:'webOfficeCtrl as vm',
                data:params,
                resolve: {
                    loadWebOfficeFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './weboffice/weboffice.controller.js',
                            './weboffice/weboffice.directive.js',
                            './weboffice/weboffice.service.js'
                        ]);
                    }
                },
                preCloseCallback:function () {

                }
            });
        }



        //执行方法
        activate();


    }

})();

