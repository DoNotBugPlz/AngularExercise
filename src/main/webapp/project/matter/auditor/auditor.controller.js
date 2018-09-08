/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.matter')
        .controller('auditorCtrl', auditorCtrl);
    auditorCtrl.$inject = ['$scope','$stateParams','auditorService','coreService','pageInfDefault','ngDialog','_','$window'];
    /* @ngInject */
    function auditorCtrl($scope,$stateParams,auditorService,coreService,pageInfDefault,ngDialog,_,$window) {
        var vm = this;
        vm.addMatter = addMatter;
        vm.delSmsPl = delSmsPl;
        vm.deleteSms = deleteSms;
        vm.loadAuditorList = loadAuditorList;
        vm.editMatter = editMatter;
        vm.viewMatter = viewMatter;
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
        function  clearSearchParams() {
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
        var setSmsList = setSmsList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        ////////////////
        function activate() {
            loadAuditorList();
            coreService.getCategoryValues('SMS_STATUS')
                .then(setCategoryValues);
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.clattachstatusCatagory = coreService.covertCategoryValueIdToInt(result["SMS_STATUS"]);
        }


        function viewMatter(matter){
            opMatter("查看事项", {"matter_id": matter.id,"is_view":true});
        }
        
        function  editMatter(matter) {
            opMatter("修改事项", {"matter_id": matter.id});
        }

        function addMatter() {
            opMatter("新增事项", {});
        }

            function opMatter(title, params) {
                var height = $window.innerHeight;
                var width = $window.innerWidth;

                ngDialog.open({
                    title: title,
                    template: "matter/auditor/detail/auditor.detail.html",
                    height: '900px',
                    width: '1400px',
                    controller: 'matterDetailCtrl as vm',
                    data: params,
                    resolve: {
                        loadSmsDetailFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './matter/auditor/detail/auditor.detail.controller.js',
                                './matter/auditor/detail/auditor.detail.service.js',
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


        function deleteSms(obj) {
            delSmsOp(obj.id);
        }
        function loadAuditorList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            auditorService.loadAuditorList(params)
                .then(function(response){
                    setSmsList(response,params.pageNumber)
                });
        }
        //刷新列表
        function refreshList() {
            loadAuditorList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setSmsList(response,pageNum) {
            var result = response.data;
            vm.matterList = result.rows;
            vm.auditorListPage = angular.extend({pageTurn: 'loadAuditorList',pagenum:pageNum}, result);
        }

        function delSmsPl() {
            delSmsOp(getAllSelectId(vm.smsList).join(","));
        }

        function delSmsOp(objIds) {
            if(angular.isUndefined(objIds)||objIds===''){
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？",function () {
                var params= {"ids":objIds};
                auditorService.deleteSms(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }
        


        //执行方法
        activate();


    }

})();

