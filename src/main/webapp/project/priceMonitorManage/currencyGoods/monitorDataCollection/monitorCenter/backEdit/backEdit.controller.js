/**
 * Created by chencl on 2018/8/30
 * 待填报列表
 */
(function () {
    'use strict';

    angular
        .module('app.backEdit')
        .controller('BackEditCtrl', BackEditCtrl);
    BackEditCtrl.$inject = ['$scope','$stateParams','backEditService','pageInfDefault','coreService','ngDialog','$window'];

    /* @ngInject */
    function BackEditCtrl($scope,$stateParams,backEditService,pageInfDefault,coreService,ngDialog,$window) {
        var vm =this;
        vm.condition ={};
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        vm.clearAll = clearAll;
        vm.getList  = getList;
        vm.editDemo = editDemo;
        activate();
        function activate() {
            vm.signList = [
                {id:'a1',chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'51',monitor_point:'南小区农贸市场',is_pub:"1"},
                {id:'b2',chinaname:'萝卜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"},
                {id:'c3',chinaname:'菜茄子',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'39',monitor_point:'羽山路大润发超市',is_pub:"1"}
            ];
        }

        function getList(pageNumber,pageSize) {
            var pageInfo = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInfo,vm.condition);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInfo);
            return backEditService.getList(params).then(setList);
        }
        function setList(response,pageNum) {
            var result = response.data;
            vm.signList = result.rows;
            vm.signListPage = angular.extend({pageTurn: 'getList',pagenum:pageNum}, result);
        }
        function clearAll() {
            vm.condition = {}
        }

        function editDemo(obj,opType) {
            if(obj.actual_sign_nums>50 || obj.actual_sign_nums<40) {
                openIndex("退回说明",{"demoId":obj.id,opType:opType});
            }
        }

        function openIndex(title,param){
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            ngDialog.open({
                title: title,
                template:"./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/backEdit/backDetail/back.detail.html",
                height:'550px',
                width:'800px',
                controller:'BackDetailCtrl as vm',
                data:param,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/backEdit/backDetail/back.detail.controller.js",
                            "./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/backEdit/backDetail/back.detail.service.js",
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

    }
})();

