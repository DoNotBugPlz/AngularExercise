/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.verification')
        .controller('verificationCtrl', verificationCtrl);
    verificationCtrl.$inject = ['$scope','$stateParams','verificationService','coreService','pageInfDefault','ngDialog','_','$window'];
    /* @ngInject */
    function verificationCtrl($scope,$stateParams,verificationService,coreService,pageInfDefault,ngDialog,_,$window) {
        var vm = this;
        vm.loadverificationList = loadverificationList;
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
        var setVerificationList = setVerificationList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        ////////////////
        function activate() {
            loadverificationList();
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


        function loadverificationList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            verificationService.loadverificationList(params)
                .then(function(response){
                    setVerificationList(response,params.pageNumber)
                });
        }
        //刷新列表
        function refreshList() {
            loadverificationList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setVerificationList(response,pageNum) {
            var result = response.data;
            vm.verificationList = result.rows;
            vm.verificationListPage = angular.extend({pageTurn: 'loadverificationList',pagenum:pageNum}, result);
        }

        //执行方法
        activate();


    }

})();

