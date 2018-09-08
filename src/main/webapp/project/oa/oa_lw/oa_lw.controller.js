/**
 * Created by tr on 2018年8月22日10:48:54
 */
(function () {
    'use strict';   // js 编写标准化
    angular
        .module('app.lw')
        .controller('LwCtrl', LwCtrl); // 创建ctrl
    LwCtrl.$inject = [
        '$state',
        '$scope',
        'ngDialog',
        '_',
        'lwService',
        'pageInfDefault',
        '$window',
    ];
    function LwCtrl($state,$scope,ngDialog,_,lwService,pageInfDefault,$window) {
        var vm = this;
        vm.addInfo = addInfo;
        vm.edtInfo = edtInfo;

        function addInfo() {
            openWind("新增来文",{});
        }
        function edtInfo(obj) {
            openWind("修改来文",obj);
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
        function loadLwlList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            lwService.loadLwlList(params)
                .then(function(response){
                    setLwList(response,params.pageNumber)
                });
        }



        function setLwList(response,pageNum) {
            var result = response.data;
            vm.lwList = result.rows;
            vm.LwListPage = angular.extend({pageTurn: 'lwList',pagenum:pageNum}, result);
        }

        function openWind(title,params) {
            ngDialog.open({
                title: title,
                template:"./oa/oa_lw/oa_lwDetail/oa_lw_detail.html",
                height:'700px',
                width:'950px',
                controller:'LwDetailCtrl as vm',
                data:{editInfo:params},
                resolve: {
                    loadLwFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './oa/oa_lw/oa_lwDetail/oa_lw_detail.controller.js',
                            './oa/oa_lw/oa_lwDetail/oa_lw_detail.service.js',
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
            loadLwlList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize);
        }

        function activate() {
            loadLwlList();
        }
        activate();




    }
})();