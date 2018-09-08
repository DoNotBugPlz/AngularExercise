/**
 * Created by tr on 2018年8月22日10:48:54
 */
(function () {
    'use strict';   // js 编写标准化
    angular
        .module('app.wh')
        .controller('WhCtrl', WhCtrl); // 创建ctrl
    WhCtrl.$inject = [
        '$state',
        '$scope',
        'ngDialog',
        '_',
        'whService',
        'pageInfDefault',
        '$window',
    ];
    function WhCtrl($state,$scope,ngDialog,_,whService,pageInfDefault,$window) {
        var vm = this;
        vm.loadWhlList = loadWhlList;
        vm.addInfo = addInfo;
        vm.edtInfo = edtInfo;
        vm.disableInfo = disableInfo;
        vm.undeleteInfo = undeleteInfo;
        vm.delInfo = delInfo;
        vm.delInfoByid = delInfoByid;
        
        function delInfoByid(id) {
            if(id != null){
                AppTools.confirm("确定删除所选记录吗？",function () {
                    var params= {"ids":id};
                    whService.delinfo(params).then(function () {
                        refreshList();
                        AppTools.successTips("删除成功！");
                    });
                });
            }else{
                AppTools.infoTips("请选择要删除的信息！");
                return;
            }
        }

        function delInfo() {
            var selectIds = getAllSelectId( vm.whList).join(",");
            if (null == selectIds || selectIds.length < 1) {
                AppTools.infoTips("请选择要删除的信息！");
                return;
            }else{
                AppTools.confirm("确定删除所选记录吗？",function () {
                    var params= {"ids":selectIds};
                    whService.delinfo(params).then(function () {
                        refreshList();
                        AppTools.successTips("删除成功！");
                    });
                });
            }

            
        }

        function undeleteInfo() {
            var selectIds = getAllSelectId( vm.whList).join(",");
            if (null == selectIds || selectIds.length < 1) {
                AppTools.infoTips("请选择要启用的角色！");
                return;
            }else{
                undeleteop(getAllSelectId( vm.whList).join(","));
            }
        }
        
        function disableInfo(){
            var selectIds = getAllSelectId( vm.whList).join(",");
            if (null == selectIds || selectIds.length < 1) {
                AppTools.infoTips("请选择要禁用的角色！");
                return;
            }else{
                disableop(getAllSelectId( vm.whList).join(","));
            }
        }

        function disableop(objIds){
            var params = {ids: objIds};
            whService.disableInfo(params)
                .then(function (response) {
                    AppTools.successTips("禁用成功！");
                    refreshList();
                })
        }

        function undeleteop(objIds){
            var params = {ids: objIds};
            whService.undeleteInfo(params)
                .then(function (response) {
                    AppTools.successTips("启用成功！");
                    refreshList();
                })
        }



        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };

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

        // 加载数据
            function loadWhlList(pageNumber,pageSize) {
                var pageInf = {
                    pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                    pageSize:pageSize||vm.currentPageInf.pageSize
                };
                var params = angular.extend(pageInf,vm.searchParams);
                vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
                whService.loadWhlList(params)
                    .then(function(response){
                        setWhList(response,params.pageNumber)
                    });
        }

        function setWhList(response,pageNum) {
            var result = response.data;
            vm.whList = result.rows;
            vm.whListPage = angular.extend({pageTurn: 'whList',pagenum:pageNum}, result);
        }

        function addInfo() {
            openWind("新增文号",{});
        }
        function edtInfo(obj) {
            openWind("修改文号",obj);
        }

        function openWind(title,params) {
            ngDialog.open({
                title: title,
                template:"./oa/oa_wh/oaDetail/oa_wh_detail.html",
                height:'180px',
                width:'800px',
                controller:'WhDetailCtrl as vm',
                data:{editInfo:params},
                resolve: {
                    loadwqtFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './oa/oa_wh/oaDetail/oa_wh_detail.controller.js',
                            './oa/oa_wh/oaDetail/oa_wh_detail.service.js',
                            'My97DatePicker'
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
            loadWhlList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize);
        }

        function activate() {
            loadWhlList();
        }
        activate();




    }
})();