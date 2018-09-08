/**
 * Created by chencl on 2018/8/30
 * 待填报列表
 */
(function () {
    'use strict';

    angular
        .module('app.helpFill')
        .controller('HelpFillCtrl', HelpFillCtrl);
    HelpFillCtrl.$inject = ['$scope','$stateParams','helpFillService','pageInfDefault','coreService','ngDialog','$window'];

    /* @ngInject */
    function HelpFillCtrl($scope,$stateParams,helpFillService,pageInfDefault,coreService,ngDialog,$window) {
        var vm =this;
        vm.condition ={};
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        vm.clearAll = clearAll;
        vm.getList  = getList;
        vm.changType  = changType;
        vm.openIndex = openIndex;
        vm.check_type_a = true;
        vm.check_type_b = false;
        activate();
        function activate() {
            vm.signList = [
                {chinaname:'一、粮油类',style:{"text-align":'left'}},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'45',monitor_point:'南小区农贸市场',is_pub:"1"},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'45',monitor_point:'南小区农贸市场',is_pub:"1"},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'45',monitor_point:'南小区农贸市场',is_pub:"1"},
                {chinaname:'二、肉蛋鱼',style:{"text-align":'left'}},
                {chinaname:'鲜猪肉',site_name:"精瘦肉",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'浦口区苏果超市',is_pub:"1"},
                {chinaname:'三、蔬菜类',style:{"text-align":'left'}},
                {chinaname:'黄瓜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"},
                {chinaname:'萝卜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"},
                {chinaname:'菜茄子',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"},
                {chinaname:'一、粮油类',style:{"text-align":'left'}},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'45',monitor_point:'南小区农贸市场',is_pub:"1"},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'45',monitor_point:'南小区农贸市场',is_pub:"1"},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'45',monitor_point:'南小区农贸市场',is_pub:"1"},
                {chinaname:'二、肉蛋鱼',style:{"text-align":'left'}},
                {chinaname:'鲜猪肉',site_name:"精瘦肉",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'浦口区苏果超市',is_pub:"1"},
                {chinaname:'三、蔬菜类',style:{"text-align":'left'}},
                {chinaname:'黄瓜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"},
                {chinaname:'萝卜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"},
                {chinaname:'菜茄子',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"}

            ];

            vm.signList_b = [
                {chinaname:'一、粮油类',style:{"text-align":'left'}},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'45',monitor_point:'南小区农贸市场',is_pub:"1"},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'45',monitor_point:'南小区农贸市场',is_pub:"1"},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'45',monitor_point:'南小区农贸市场',is_pub:"1"},
                {chinaname:'二、肉蛋鱼',style:{"text-align":'left'}},
                {chinaname:'鲜猪肉',site_name:"精瘦肉",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'浦口区苏果超市',is_pub:"1"},
                {chinaname:'三、蔬菜类',style:{"text-align":'left'}},
                {chinaname:'黄瓜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"},
                {chinaname:'萝卜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"},
                {chinaname:'菜茄子',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"}
            ];
        }

        function getList(pageNumber,pageSize) {
            var pageInfo = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInfo,vm.condition);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInfo);
            return helpFillService.getList(params).then(setList);
        }
        function setList(response,pageNum) {
            var result = response.data;
            vm.signList = result.rows;
            vm.signListPage = angular.extend({pageTurn: 'getList',pagenum:pageNum}, result);
        }
        function clearAll() {
            vm.condition = {}
        }

        function changType(i) {
            if(i==1){
                vm.check_type_a = true;
                vm.check_type_b = false;
            }else{
                vm.check_type_a = false;
                vm.check_type_b = true;
            }
        }

        function openIndex(i) {
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            if(i==1){   // 调整点
                ngDialog.open({
                    title: '选择监测表',
                    template:'./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/helpFill/monitorTable/monitor.table.html',
                    height:'550px',
                    width:'800px',
                    controller:'MonitorTableCtrl as vm',
                    data:{},
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/helpFill/monitorTable/monitor.table.controller.js',
                                './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/helpFill/monitorTable/monitor.table.service.js',
                                'chosen'
                            ]);
                        }
                    },
                    preCloseCallback:function () {
                        // refreshList();
                    }
                });
            }else{ // 调整品种
                ngDialog.open({
                    title: '选择报告单位',
                    template:'./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/helpFill/reportUnit/report.unit.html',
                    height:'550px',
                    width:'800px',
                    controller:'ReportUnitCtrl as vm',
                    data:{},
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/helpFill/reportUnit/report.unit.controller.js',
                                './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/helpFill/reportUnit/report.unit.service.js',
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


    }
})();

