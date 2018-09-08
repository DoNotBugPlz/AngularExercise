/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.oneverification')
        .controller('oneverificationCtrl', oneverificationCtrl);
    oneverificationCtrl.$inject = ['$scope','$stateParams','oneverificationService','coreService','pageInfDefault','ngDialog','_','$window'];
    /* @ngInject */
    function oneverificationCtrl($scope,$stateParams,oneverificationService,coreService,pageInfDefault,ngDialog,_,$window) {
        var vm = this;
        vm.loadOneverificationList = loadOneverificationList;
        vm.clearSearchParams = clearSearchParams;
        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        vm.viewVerification = viewVerification;
        function selectAll(dateList) {
            vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(dateList)){
                _.forEach(dateList,function (item) {
                    item.selected=vm.allSelected;
                })
            }
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
        var setloadOneverificationList = setloadOneverificationList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        ////////////////
        function activate() {
            loadOneverificationList();
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



        function opVerification(title, params) {
            ngDialog.open({
                title: title,
                template: "verification/deatil/verification.deatail.html",
                height: '650px',
                width: '1400px',
                controller: 'verificationDetailCtrl as vm',
                data: params,
                resolve: {
                    loadSmsDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './verification/deatil/verification.detail.controller.js',
                            './verification/deatil/verification.detail.service.js',
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


        function loadOneverificationList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            oneverificationService.loadOneverificationList(params)
                .then(function(response){
                    setloadOneverificationList(response,params.pageNumber)
                });
        }
        //刷新列表
        function refreshList() {
            loadOneverificationList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setloadOneverificationList(response,pageNum) {
            var result = response.data;
            vm.OneverificationList = result.rows;
            vm.OneverificationListPage = angular.extend({pageTurn: 'loadOneverificationList',pagenum:pageNum}, result);
        }







        //执行方法
        activate();


    }

})();

