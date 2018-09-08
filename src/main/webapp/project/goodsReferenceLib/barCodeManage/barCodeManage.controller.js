(function () {
    'use strict';
    angular
        .module('app.barCodeManage')
        .controller('BarCodeManageCtrl', BarCodeManageCtrl);
    BarCodeManageCtrl.$inject = ['$scope', '$stateParams', 'barCodeManageService', 'pageInfDefault', 'ngDialog', '_'];

    /* @ngInject */
    function BarCodeManageCtrl($scope, $stateParams, barCodeManageService, pageInfDefault, ngDialog, _) {
        var vm = this;
        vm.title = 'DesktopCtrl';
        vm.viewBarCodeManage = viewBarCodeManage;
        vm.editBarCodeManage = editBarCodeManage;
        vm.loadBarCodeManageList = loadBarCodeManageList;
        //重置
        vm.reset = reset;

        /*****/
        var setBarCodeManageList = setBarCodeManageList;
        var refreshList = refreshList;
        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };
        /*默认状态*/
        vm.category_delstatus = [{id: 0, text: "已启用"}, {id: 1, text: "已停用"}];
        activate();

        ////////////////
        function activate() {
            loadBarCodeManageList();
        }

        //重置
        function reset() {
            vm.searchParams = {};
        }

        function editBarCodeManage(barCodeManage) {
            opAdd("编辑商品条形码信息", {"barCodeManageId": barCodeManage.goods_id});
        }

        function opAdd(title, params) {
            ngDialog.open({
                title: title,
                template: "goodsReferenceLib/barCodeManage/add/barCodeManage.add.html",
                height: '600px',
                width: '1000px',
                controller: 'barCodeManageAddCtrl as vm',
                data: params,
                resolve: {
                    loadBarCodeManageDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'goodsReferenceLib/barCodeManage/add/barCodeManage.add.controller.js',
                            'goodsReferenceLib/barCodeManage/add/barCodeManage.add.service.js',
                            'ng-zTree',
                            'My97DatePicker',
                            'mCustomScrollbar',
                            'JsBarcode'
                        ]);
                    }
                },
                preCloseCallback: function () {
                    refreshList();
                }
            });
        }

        function viewBarCodeManage(barCodeManage) {
            opBarCodeManage("查看商品条形码信息", {"barCodeManageId": barCodeManage.goods_id, "is_view": true});
        }

        function opBarCodeManage(title, params) {
            ngDialog.open({
                title: title,
                template: "goodsReferenceLib/barCodeManage/detail/barCodeManage.detail.html",
                height: '600px',
                width: '510px',
                controller: 'barCodeManageDetailCtrl as vm',
                data: params,
                resolve: {
                    loadBarCodeManageDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'goodsReferenceLib/barCodeManage/detail/barCodeManage.detail.controller.js',
                            'goodsReferenceLib/barCodeManage/detail/barCodeManage.detail.service.js',
                            'ng-zTree',
                            'My97DatePicker',
                            'mCustomScrollbar',
                            'JsBarcode'
                        ]);
                    }
                },
                preCloseCallback: function () {
                    refreshList();
                }
            });
        }

        //加载数据列表
        function loadBarCodeManageList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            barCodeManageService.loadBarCodeManageList(params)
                .then(function (response) {
                    setBarCodeManageList(response, params.pageNumber)
                });
        }

        //刷新列表
        function refreshList() {
            loadBarCodeManageList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }

        function setBarCodeManageList(response, pageNum) {
            var result = response.data;
            vm.barCodeManageList = result.rows;
            vm.barCodeManageListPage = angular.extend({pageTurn: 'loadBarCodeManageList', pagenum: pageNum}, result);
        }

    }

})();

