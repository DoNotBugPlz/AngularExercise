(function () {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .controller('GoodsLinkCtrl', GoodsLinkCtrl);

    GoodsLinkCtrl.$inject = ['$scope','$stateParams','pageInfDefault','goodsLinkService','coreService','$q','ngDialog'];

    /* @ngInject */
    function GoodsLinkCtrl($scope,$stateParams,pageInfDefault,goodsLinkService,coreService,$q,ngDialog) {
        var vm = this;
        vm.name = $scope.ngDialogData.name;
        vm.goodsfamilyid = $scope.ngDialogData.goodsfamilyid;
        vm.moduleIndex=1;
        vm.addGoodsLinkDetail = addGoodsLinkDetail;
        vm.cancleGoodsLink = cancleGoodsLink;
        vm.searchList = searchList;
        vm.resetSearch = resetSearch;
        vm.moduleClick = moduleClick;
        vm.loadGoodsLinkList = loadGoodsLinkList;

        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:5
        };


        activate();

        function activate() {
            loadGoodsLinkList();
        }

        function loadGoodsLinkList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            goodsLinkService.loadGoodsLinkList(params)
                .then(function (resp) {
                    var result = resp.data;
                    vm.goodsLinkList = result.rows;
                    _.map(vm.goodsLinkList,function (item,index) {
                        item.index = index+1;
                    });
                    vm.goodsLinkListPage = angular.extend({pageTurn: 'loadGoodsLinkList',pagenum:vm.currentPageInf.pageNumber,pagesize:vm.currentPageInf.pageSize}, result);
                })
        }

        function addGoodsLinkDetail() {
            var params = {name:vm.name,goodsfamilyid:vm.goodsfamilyid};
            ngDialog.open({
                title: '添加数据关联',
                template:"goodsReferenceLib/standardGoodsReferenceLib/addGoodsLink/addGoodsLink.html",
                height:'550px',
                width:'1200px',
                controller:'AddGoodsLinkCtrl as vm',
                data:params,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './goodsReferenceLib/standardGoodsReferenceLib/addGoodsLink/addGoodsLink.controller.js',
                            './goodsReferenceLib/standardGoodsReferenceLib/addGoodsLink/addGoodsLink.service.js',
                            'My97DatePicker'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    loadGoodsLinkList();
                }
            });
        }

        function cancleGoodsLink(id,value) {
            var params = {id:id,delstatus:value};
            goodsLinkService.changeGoodsLinkStatus(params)
                .then(function (resp) {
                    loadGoodsLinkList();
                })
        }
        function searchList() {
            loadGoodsLinkList();
        }

        function resetSearch() {
            vm.searchParams = {};
        }

        function moduleClick(value) {
            vm.moduleIndex = value;
        }




    }
})();

