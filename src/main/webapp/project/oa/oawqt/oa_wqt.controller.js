/**
 * Created by tr on 2018年8月22日10:48:54
 */
(function () {
    'use strict';   // js 编写标准化
    angular
        .module('app.wqt')
        .controller('WqtlCtrl', WqtlCtrl); // 创建ctrl
    WqtlCtrl.$inject = [
        '$state',
        '$scope',
        'ngDialog',
        '_',
        'wqtService',
        'pageInfDefault',
        '$window',
    ];
    function WqtlCtrl($state,$scope,ngDialog,_,wqtService,pageInfDefault,$window) {
        var vm = this;
        vm.loadWqtlList = loadWqtlList;
        vm.addInfo = addInfo;
        vm.edtInfo = edtInfo;

        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };

        // 加载数据
        function loadWqtlList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            wqtService.loadWqtlList(params)
                .then(function(response){
                    setWqtList(response,params.pageNumber)
                });
        }

        function setWqtList(response,pageNum) {
            var result = response.data;
            vm.wqtList = result.rows;
            vm.wqtListPage = angular.extend({pageTurn: 'wqtList',pagenum:pageNum}, result);
        }

        function addInfo() {
            openWind("新增文签头",{});
        }
        function edtInfo(obj) {
            openWind("修改文签头",obj);
        }
        function openWind(title,params) {
            ngDialog.open({
                title: title,
                template:"./oa/oawqt/oawqtDetail/oa_wqt_detail.html",
                height:'550px',
                width:'800px',
                controller:'WqtDetailCtrl as vm',
                data:{editInfo:params},
                resolve: {
                    loadwqtFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './oa/oawqt/oawqtDetail/oa_wqt_detail.controller.js',
                            './oa/oawqt/oawqtDetail/oa_wqt_detail.service.js',
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
            loadWqtlList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize);
        }

        function activate() {
            loadWqtlList();
        }
        activate();




    }
})();