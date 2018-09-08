/**
 * Created by chencl on 2018/8/30
 * 待填报列表
 */
(function () {
    'use strict';

    angular
        .module('app.schemeManage')
        .controller('SchemeManageCtrl', SchemeManageCtrl);
    SchemeManageCtrl.$inject = ['$scope','$stateParams','schemeManageService','pageInfDefault','coreService','ngDialog','$state'];

    /* @ngInject */
    function SchemeManageCtrl($scope,$stateParams,schemeManageService,pageInfDefault,coreService,ngDialog,$state) {
        var vm =this;
        vm.condition ={};
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        vm.clearAll = clearAll;
        vm.getList  = getList;
        vm.openScheme = openScheme;
        vm.turnDataListPage = turnDataListPage;

        activate();
        function activate() {
           // getList()
            vm.signList = [
                {chinaname:'肉类监控',site_name:"猪肉、上升、牛肉、下降",is_pub:"1"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:1,
                rows:[
                    {chinaname:'肉类监控',site_name:"猪肉、上升、牛肉、下降",is_pub:"1"}
                ]
            }
        }

        function getList(pageNumber,pageSize) {
            var pageInfo = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInfo,vm.condition);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInfo);
            return schemeManageService.getList(params).then(setList);
        }
        function setList(response,pageNum) {
            var result = response.data;
            vm.signList = result.rows;
            vm.signListPage = angular.extend({pageTurn: 'getList',pagenum:pageNum}, result);
        }
        function clearAll() {
            vm.condition = {}
        }

        function openScheme(title,param){
            ngDialog.open({
                title: '监测方案定制',
                template:"./priceOpinionMonitor/schemeManage/schemeDetail/scheme.detail.html",
                height:'450px',
                width:'800px',
                controller:'SchemeDetailCtrl as vm',
                data:{},
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "./priceOpinionMonitor/schemeManage/schemeDetail/scheme.detail.controller.js",
                            "./priceOpinionMonitor/schemeManage/schemeDetail/scheme.detail.service.js",
                            './utils/app.checkboxSel.js',
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    // refreshList();
                }
            });
        }

        function turnDataListPage(n) {
            $state.go('dataList', {scheme_id:n.id});
        }
        
    }
})();

