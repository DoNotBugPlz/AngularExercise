/**
 * Created by yzr 2018/8/17
 */
(function () {
    'use strict';
    angular
        .module('app.automatic')
        .controller('automaticCtrl', automaticCtrl);
    automaticCtrl.$inject = ['$scope','$stateParams','automaticService','coreService','pageInfDefault','ngDialog','_','$window'];
    /* @ngInject */
    function automaticCtrl($scope,$stateParams,automaticService,coreService,pageInfDefault,ngDialog,_,$window) {
        var vm = this;
        vm.addSms = addSms;
        vm.delSmsPl = delSmsPl;
        vm.deleteSms = deleteSms;
        vm.loadSmsList = loadSmsList;
        vm.clearSearchParams = clearSearchParams;
        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        vm.viewAutomatic = viewAutomatic;
        function selectAll(dateList) {
            vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(dateList)){
                _.forEach(dateList,function (item) {
                    item.selected=vm.allSelected;
                })
            }
        }

        function viewAutomatic(automatic){
        //    opVerification("查看", {"Verification_id": Verification.id,"is_view":true});
            opautomatic("查看", {"is_view":true});
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
        var setSmsList = setSmsList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        ////////////////
        function activate() {
            loadSmsList();
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

        function addSms() {
            opSms("短信新增", {});
        }

        function opautomatic(title, params) {
            ngDialog.open({
                title: title,
                template: "verification/automatic/deatil/automatic.deatil.html",
                height: '650px',
                width: '1400px',
                controller: 'automaticDetailCtrl as vm',
                data: params,
                resolve: {
                    loadSmsDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './verification/automatic/deatil/automatic.detail.controller.js',
                            './verification/automatic/deatil/automatic.detail.service.js',
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


        function deleteSms(obj) {
            delSmsOp(obj.id);
        }
        function loadSmsList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            automaticService.loadSmsList(params)
                .then(function(response){
                    setSmsList(response,params.pageNumber)
                });
        }
        //刷新列表
        function refreshList() {
            loadSmsList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setSmsList(response,pageNum) {
            var result = response.data;
            vm.smsList = result.rows;
            vm.smsListPage = angular.extend({pageTurn: 'loadSmsList',pagenum:pageNum}, result);
        }

        function delSmsPl() {
            delSmsOp(getAllSelectId(vm.smsList).join(","));
        }

        function delSmsOp(objIds) {
            if(angular.isUndefined(objIds)||objIds===''){
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？",function () {
                var params= {"ids":objIds};
                automaticService.deleteSms(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }



        //执行方法
        activate();


    }

})();

