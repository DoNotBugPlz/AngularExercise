(function () {
    'use strict';

    angular
        .module('app.taskAdjustRecord')
        .controller('AdjustDetailCtrl', AdjustDetailCtrl);

    AdjustDetailCtrl.$inject = ['localStorageService', '$scope', 'MonitorDetailService', 'ngDialog', 'coreService','$window'];

    /* @ngInject */
    function AdjustDetailCtrl(localStorageService, $scope, MonitorDetailService, ngDialog, coreService,$window) {
        var vm = this;
        vm.cancelDialog  = cancelDialog;
        vm.changType  = changType;
        vm.source_param  = $scope.ngDialogData;
        vm.check = 1;
        vm.check_type_a = true;
        vm.check_type_b = false;
        vm.openIndex = openIndex;
        function activate() {
            vm.signList = [{chinaname:'城市居民食品零售价格监测',site_name:"浦口区价格监测中心",col_datetime:'2018年4月18日',actual_sign_nums:'2018-4-18 09:00-17:00',is_pub_text:"待填报",is_pub:"1"},
                {chinaname:'优质粮食收购价格监测',site_name:"浦口区价格监测中心",col_datetime:'2018年4月12日',actual_sign_nums:'2018-4-9 09:00- 2018-4-12 17:00',is_pub_text:"暂存",is_pub:"0"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:2,
                rows:[{chinaname:'城市居民食品零售价格监测',site_name:"浦口区价格监测中心",col_datetime:'2018年4月18日',actual_sign_nums:'2018-4-18 09:00-17:00',is_pub_text:"待填报",is_pub:"1"},
                    {chinaname:'优质粮食收购价格监测',site_name:"浦口区价格监测中心",col_datetime:'2018年4月12日',actual_sign_nums:'2018-4-9 09:00- 2018-4-12 17:00',is_pub_text:"暂存",is_pub:"0"}
                ]
            }
            vm.goodList = [
                {chinaname:'一、粮油类',style:{"text-align":'left'}},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'南小区农贸市场',is_pub:"1"},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'南小区农贸市场',is_pub:"1"},
                {chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'南小区农贸市场',is_pub:"1"},
                {chinaname:'二、肉蛋鱼',style:{"text-align":'left'}},
                {chinaname:'鲜猪肉',site_name:"精瘦肉",col_datetime:'元/500克',actual_sign_nums:'浦口区苏果超市',is_pub:"1"},
                {chinaname:'三、蔬菜类',style:{"text-align":'left'}},
                {chinaname:'黄瓜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'羽山路大润发超市',is_pub:"1"},
                {chinaname:'萝卜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'羽山路大润发超市',is_pub:"1"},
                {chinaname:'菜茄子',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'羽山路大润发超市',is_pub:"1"}
            ];
        }
        activate();
        function cancelDialog() {
            ngDialog.close($scope.ngDialogId);
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
                    title: '选择监测点',
                    template:'./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/monitorList/monitor.list.html',
                    height:'550px',
                    width:'800px',
                    controller:'MonitorListCtrl as vm',
                    data:{},
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/monitorList/monitor.list.controller.js',
                                './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/monitorList/monitor.list.service.js',
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
                    title: '选择监测品种',
                    template:'./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/varietyList/variety.list.html',
                    height:'550px',
                    width:'800px',
                    controller:'VarietyListCtrl as vm',
                    data:{},
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/varietyList/variety.list.controller.js',
                                './priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/taskAdjustRecord/varietyList/variety.list.service.js',
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

