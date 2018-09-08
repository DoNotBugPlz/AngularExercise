/**
 * Created by tr on 2018年8月22日10:48:54
 */
(function () {
    'use strict';   // js 编写标准化
    angular
        .module('app.foreign_material')
        .controller('ForeignMaterialCtrl', ForeignMaterialCtrl); // 创建ctrl
    ForeignMaterialCtrl.$inject = [
        '$state',
        '$scope',
        'ngDialog',
        '_',
        'foreignMaterialService',
        'pageInfDefault',
        '$window',
        ];
    function ForeignMaterialCtrl($state,$scope,ngDialog,_,foreignMaterialService,pageInfDefault,$window) {
        var vm = this;
        vm.loadForeignMaterialList = loadForeignMaterialList;
        vm.addFmInfo = addFmInfo;
        vm.editFmInfo = editFmInfo;
        vm.reSetInfo = reSetInfo;
        vm.delFmInfo = delFmInfo;
        var setForeignMaterialList = setForeignMaterialList;
        var refreshList = refreshList;


        function delFmInfo(){
            delFmInfoOp(getAllSelectId( vm.foreignMaterialList).join(","));
        }

        function delFmInfoOp(objIds) {
            if(angular.isUndefined(objIds)||objIds===''){
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？",function () {
                var params= {"ids":objIds};
                foreignMaterialService.delFmInfoOp(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
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


        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };

        function reSetInfo() {
            vm.searchParams = {};
        }


        // 加载对外材料列表
        function loadForeignMaterialList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            foreignMaterialService.loadForeignMaterialList(params)
                .then(function(response){
                    setForeignMaterialList(response,params.pageNumber)
                });
        }
        function setForeignMaterialList(response,pageNum) {
            var result = response.data;
            vm.foreignMaterialList = result.rows;
            vm.foreignMaterialListPage = angular.extend({pageTurn: 'foreignMaterialList',pagenum:pageNum}, result);
        }

        function addFmInfo() {
            opDemo("新增对外材料",{});
        }
        function editFmInfo(obj) {
            opDemo("修改对外材料",obj);
        }
        function opDemo(title,params) {
            ngDialog.open({
                title: title,
                template:"./foreignMaterial/foreignMaterialDedail/foreignMaterial_detail.html",
                height:'550px',
                width:'800px',
                controller:'ForeignMaterialDetailCtrl as vm',
                data:{fmInfo:params},
                resolve: {
                    loadforeignMaterialFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './foreignMaterial/foreignMaterialDedail/foreignMaterial_detail.controller.js',
                            './foreignMaterial/foreignMaterialDedail/foreignMaterial_detail.service.js',
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
            loadForeignMaterialList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function activate() {
            loadForeignMaterialList();
        }
        activate();




    }
})();