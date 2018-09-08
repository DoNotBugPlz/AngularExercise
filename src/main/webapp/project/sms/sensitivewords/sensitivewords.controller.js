/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.sensitive')
        .controller('sensitiveCtrl', sensitiveCtrl);
    sensitiveCtrl.$inject = ['$scope','$stateParams','sensitivewordsservice','coreService','pageInfDefault','ngDialog','_','$window'];
    /* @ngInject */
    function sensitiveCtrl($scope,$stateParams,sensitivewordsservice,coreService,pageInfDefault,ngDialog,_,$window) {
        var vm = this;
        vm.addsensitivewords = addsensitivewords;
        vm.delsensitivewords = delsensitivewords;
        vm.deletesensitive = deletesensitive;
        vm.loadsensitiveList = loadsensitiveList;
        vm.updatesitive=updatesitive;
        vm.StopSmsMonitor = StopSmsMonitor;
        vm.StartSmsMonitor = StartSmsMonitor;
        vm.clearSearchParams = clearSearchParams;


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

        function clearSearchParams(){
            vm.searchParams = {};
        }

        /***批量选择控制**/
        var setSitiveList = setSitiveList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        ////////////////
        function activate() {
            loadsensitiveList();
            coreService.getCategoryValues('SERVER_STATUS')
                .then(setCategoryValues);
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.clattachstatusCatagory = coreService.covertCategoryValueIdToInt(result["SERVER_STATUS"]);
        }

        //停用
        function StopSmsMonitor(obj) {
            var params= {
                          "ids":obj.id,
                         "delstatus":"1"
            };
            sensitivewordsservice.updateStatus(params)
                .then(function(){
                    refreshList();
                });
        }
        //启用
       function  StartSmsMonitor(obj) {
           var params= {"ids":obj.id,
                        "delstatus":"0"
           };
           sensitivewordsservice.updateStatus(params)
               .then(function(){
                   refreshList();
               });
       }


        function addsensitivewords() {
            opsensitivewords("新增敏感词", {});
        }

        function updatesitive(sensitive) {
            opsensitivewords("修改敏感词", {"ids": sensitive.id});
        }

            function opsensitivewords(title, params) {
                ngDialog.open({
                    title: title,
                    template: "sms/sensitivewords/detail/sensitivewords.detail.html",
                    height: '600px',
                    width: '1400px',
                    controller: 'sensitivewordsCtrl as vm',
                    data: params,
                    resolve: {
                        loadSmsDetailFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './sms/sensitivewords/detail/sensitivewords.detail.controller.js',
                                './sms/sensitivewords/detail/sensitivewords.detail.service.js',
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


        function deletesensitive(obj) {
            delSensitiveOp(obj.id);
        }
        function loadsensitiveList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            sensitivewordsservice.loadsensitiveList(params)
                .then(function(response){
                    setSitiveList(response,params.pageNumber)
                });
        }
        //刷新列表
        function refreshList() {
            loadsensitiveList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setSitiveList(response,pageNum) {
            var result = response.data;
            vm.SitiveList = result.rows;
            vm.SitiveListPage = angular.extend({pageTurn: 'loadsensitiveList',pagenum:pageNum}, result);
        }

        function delsensitivewords() {
            delSensitiveOp(getAllSelectId(vm.SitiveList).join(","));
        }

        function delSensitiveOp(objIds) {
            if(angular.isUndefined(objIds)||objIds===''){
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？",function () {
                var params= {"ids":objIds};
                sensitivewordsservice.deletesensitive(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }
        //执行方法
        activate();
    }

})();

