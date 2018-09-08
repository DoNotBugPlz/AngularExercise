/**
 * Created by tr on 2018年8月22日10:48:54
 */
(function () {
    'use strict';   // js 编写标准化
    angular
        .module('app.fw')
        .controller('FwCtrl', FwCtrl); // 创建ctrl
    FwCtrl.$inject = [
        '$state',
        '$scope',
        'ngDialog',
        '_',
        'fwService',
        'pageInfDefault',
        '$window',
    ];
    function FwCtrl($state,$scope,ngDialog,_,fwService,pageInfDefault,$window) {
        var vm = this;
        vm.addInfo = addInfo;
        vm.edtInfo = edtInfo;
        vm.textaaa = textaaa;

        function textaaa() {
            var params = {user_id:'a081829a657b2eb301657b5025de0000201614',ids:'20,21,23'};
            fwService.text(params)
                .then(function(response){
                });
            
        }
        

        function addInfo() {
            openWind("新增发文",{});
        }
        function edtInfo(obj) {
            openWind("修改发文",obj);
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
        function loadFwlList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            fwService.loadFwlList(params)
                .then(function(response){
                    setFwList(response,params.pageNumber)
                });
        }
        function setFwList(response,pageNum) {
            var result = response.data;
            vm.fwList = result.rows;
            vm.fwListPage = angular.extend({pageTurn: 'fwList',pagenum:pageNum}, result);
        }

        function openWind(title,params) {
            ngDialog.open({
                title: title,
                template:"./oa/oa_fw/oa_fwDetail/oa_fw_detail.html",
                height:'700px',
                width:'950px',
                controller:'FwDetailCtrl as vm',
                data:{editInfo:params},
                resolve: {
                    loadFwFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './oa/oa_fw/oa_fwDetail/oa_fw_detail.controller.js',
                            './oa/oa_fw/oa_fwDetail/oa_fw_detail.service.js',
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
            loadFwlList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize);
        }

        function activate() {
            loadFwlList();
        }
        activate();




    }
})();