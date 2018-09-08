/**
 * Created by tr on 2018年8月22日10:48:54
 */
(function () {
    'use strict';   // js 编写标准化
    angular
        .module('app.fau')
        .controller('FauCtrl', FauCtrl); // 创建ctrl
    FauCtrl.$inject = [
        '$state',
        '$scope',
        'ngDialog',
        '_',
        'fauService',
        'pageInfDefault',
        '$window',
    ];
    function FauCtrl($state,$scope,ngDialog,_,fauService,pageInfDefault,$window) {
        var vm = this;
        vm.flowList =  flowList;
        vm.ckFlowInfo = ckFlowInfo;
        vm.edtInfo =  edtInfo;
        var flow_key = '';

        function flowList() {
            var params = {filter:"processes",modelType:"0",sort:"modifiedDesc"}
            fauService.flowList(params)
                .then(function(response){
                    setFlowList(response)
                });
        }

        function ckFlowInfo(obj) {
            flow_key = obj.key;
            if(!angular.isUndefined(obj)||obj===''){
                var id =  obj.id;
                fauService.flowStepList(id)
                    .then(function(response){
                        setFlowStepList(response)
                    });
            }
        }
        
        function setFlowStepList(response) {
            flow_key
            vm.flowStepInfoList = response.data.elements;
        }
        
        function edtInfo(obj) {
            var params = {flow_key:flow_key,flow_step_key:obj.id}
            var title = "流程步骤接手人配置"
            openWind(title,params);
        }

        function openWind(title,params) {
            ngDialog.open({
                title: title,
                template:"./flow/flow_activity_user/flow_activity_userDetail/flow_activity_user_detail.html",
                height:'380px',
                width:'950px',
                controller:'fauDetailCtrl as vm',
                data:{editInfo:params},
                resolve: {
                    loadFauFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './flow/flow_activity_user/flow_activity_userDetail/flow_activity_user_detail.controller.js',
                            './flow/flow_activity_user/flow_activity_userDetail/flow_activity_user_detail.service.js',
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

        //刷新列表
        function refreshList() {
        }



        function setFlowList(response) {
            vm.flowInfoList = response.data;
        }
        function activate() {
            flowList();
        }
        activate();




        /*vm.addInfo = addInfo;
        vm.edtInfo = edtInfo;
        vm.deleteFauInfo = deleteFauInfo;
        vm.delInfo = delInfo;

        function addInfo() {
            openWind("新增流程步骤接收人",{});
        }
        function edtInfo(obj) {
            openWind("修改流程步骤接收人",obj);
        }


        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        /!***批量选择控制**!/
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

        // 加载数据
        function loadFaulList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            fauService.loadFauList(params)
                .then(function(response){
                    setFauList(response,params.pageNumber)
                });
        }



        function setFauList(response,pageNum) {
            var result = response.data;
            vm.fauList = result.rows;
            vm.FauListPage = angular.extend({pageTurn: 'fauList',pagenum:pageNum}, result);
        }

        function openWind(title,params) {
            ngDialog.open({
                title: title,
                template:"./flow/flow_activity_user/flow_activity_userDetail/flow_activity_user_detail.html",
                height:'380px',
                width:'950px',
                controller:'fauDetailCtrl as vm',
                data:{editInfo:params},
                resolve: {
                    loadFauFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './flow/flow_activity_user/flow_activity_userDetail/flow_activity_user_detail.controller.js',
                            './flow/flow_activity_user/flow_activity_userDetail/flow_activity_user_detail.service.js',
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



        //刷新列表
        function refreshList() {
            loadFaulList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize);
        }

        function activate() {
            loadFaulList();
        }
        activate();

        function deleteFauInfo(obj) {
            delFauOp(obj.id);
        }
        function delFauOp(objIds) {
            if(angular.isUndefined(objIds)||objIds===''){
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？",function () {
                var params= {"ids":objIds};
                fauService.delFauList(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }
        function delInfo() {
            delFauOp(getAllSelectId(vm.fauList).join(","));
        }*/




    }
})();