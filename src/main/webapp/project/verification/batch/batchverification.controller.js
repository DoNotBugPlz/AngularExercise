/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.batch')
        .controller('batchCtrl', batchCtrl);
    batchCtrl.$inject = ['$scope','$stateParams','bacthService','coreService','pageInfDefault','ngDialog','_','$window'];
    /* @ngInject */
    function batchCtrl($scope,$stateParams,bacthService,coreService,pageInfDefault,ngDialog,_,$window) {
        var vm = this;
        vm.addbatch = addbatch;
        vm.loadBatchList = loadBatchList;
        vm.clearSearchParams = clearSearchParams;
        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        vm.viewVerification = viewVerification;
        vm.yd = yd;
        vm.price =price;
        function selectAll(dateList) {
            vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(dateList)){
                _.forEach(dateList,function (item) {
                    item.selected=vm.allSelected;
                })
            }
        }
        
        function yd() {
            opyd("价格异动情况", {"is_view":true});
        }

        function  opyd(title, params) {
            ngDialog.open({
                title: title,
                template: "verification/batch/unusual/unusual.html",
                height:'357px',
                width:'564px',
                controller: 'unusualeCtrl as vm',
                data: params,
                resolve: {
                    loadSmsDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './verification/batch/unusual/unusual.detail.controller.js',
                            './verification/batch/unusual/unusual.detail.service.js',
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
        
        function  price() {
            opprice("价格对比情况", {"is_view":true});
        }
        
        function opprice(title, params) {
            ngDialog.open({
                title: title,
                template: "verification/batch/price/price.deatail.html",
                height:'457px',
                width:'564px',
                controller: 'priceCtrl as vm',
                data: params,
                resolve: {
                    loadSmsDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './verification/batch/price/price.detail.controller.js',
                            './verification/batch/price/price.detail.service.js',
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

        function viewVerification(Verification){
        //    opVerification("查看", {"Verification_id": Verification.id,"is_view":true});
            opVerification("查看", {"is_view":true});
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
        var setBatchList = setBatchList;
        var refreshList = refreshList;

        ////////////////
        function activate() {
            loadBatchList();
            coreService.getCategoryValues('SMS_STATUS')
                .then(setCategoryValues);
        }
        function clearSearchParams(){
            vm.searchParams = {};
        }


        function setCategoryValues(response) {
            var result = response.data;
            vm.clattachstatusCatagory = coreService.covertCategoryValueIdToInt(result["SMS_STATUS"]);
        }

        function addbatch(obj,opType) {
            opBatch("任务数据返回", {"batch_id":1,opType:opType});
        }

        function opBatch(title, params) {
            ngDialog.open({
                title: title,
                template: "verification/batch/deatil/batch.deatail.html",
                height:'307px',
                width:'534px',
                controller: 'batchCtrl as vm',
                data: params,
                resolve: {
                    loadSmsDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './verification/batch/deatil/batch.detail.controller.js',
                            './verification/batch/deatil/batch.detail.service.js',
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

        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };

        //刷新列表
        function refreshList() {
            loadBatchList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }


        function loadBatchList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            bacthService.loadBatchList(params)
                .then(function(response){
                    setBatchList(response,params.pageNumber)
                });
        }

        function setBatchList(response,pageNum) {
            var result = response.data;
            vm.batchList = result.rows;
            vm.batchListPage = angular.extend({pageTurn: 'loadBatchList',pagenum:pageNum}, result);
        }


        //执行方法
        activate();
    }

})();

