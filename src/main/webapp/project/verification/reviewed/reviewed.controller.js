/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.reviewed')
        .controller('reviewedCtrl', reviewedCtrl);
    reviewedCtrl.$inject = ['$scope','$stateParams','reviewedService','coreService','pageInfDefault','ngDialog','_','$window'];
    /* @ngInject */
    function reviewedCtrl($scope,$stateParams,reviewedService,coreService,pageInfDefault,ngDialog,_,$window) {
        var vm = this;

        vm.loadReviewedList = loadReviewedList;
        vm.clearSearchParams = clearSearchParams;
        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        vm.find = find;
        function selectAll(dateList) {
            vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(dateList)){
                _.forEach(dateList,function (item) {
                    item.selected=vm.allSelected;
                })
            }
        }

        function find(Verification){
            opreviewed("查看", {"is_view":true});
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
        var setReviewedList = setReviewedList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        ////////////////
        function activate() {
            loadReviewedList();
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


        function opreviewed(title, params) {
            ngDialog.open({
                title: title,
                template: "verification/reviewed/deatil/reviewed.deatail.html",
                height: '650px',
                width: '1400px',
                controller: 'reviewedDetailCtrl as vm',
                data: params,
                resolve: {
                    loadSmsDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './verification/reviewed/deatil/reviewed.detail.controller.js',
                            './verification/reviewed/deatil/reviewed.detail.service.js',
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



        function loadReviewedList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            reviewedService.loadReviewedList(params)
                .then(function(response){
                    setReviewedList(response,params.pageNumber)
                });
        }
        //刷新列表
        function refreshList() {
            loadReviewedList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setReviewedList(response,pageNum) {
            var result = response.data;
            vm.reviewedList = result.rows;
            vm.reviewedListtPage = angular.extend({pageTurn: 'loadReviewedList',pagenum:pageNum}, result);
        }

        //执行方法
        activate();


    }

})();

