
(function () {
    'use strict';
    angular
        .module('app.monitorTaskManage')
        .controller('AddTaskController', AddTaskController);
    AddTaskController.$inject = ['$scope', 'coreService','addTaskService', 'ngDialog', '_','$state'];

    /* @ngInject */
    function AddTaskController($scope, coreService,addTaskService, ngDialog, _,$state) {
        var vm = this;
        window.a = vm;
        window.b = $scope;
        vm.addGoods = [];
        vm.monitorIndicators = [];
        vm.addMonitorGoods = addMonitorGoods;
        vm.addOneGoodsKind = addOneGoodsKind;
        vm.addMonitorIndicators = addMonitorIndicators;
        vm.selectItem = selectItem;


        activate();
        function activate() {
            coreService.getCategoryValues('TASKTYPE,LEVELTYPE2,TASKCYCLE,TASKSTATUS,TASKCLASSES')
                .then(setCategoryValues)

        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.task_type= coreService.covertCategoryValueIdToInt(result["TASKTYPE"]);
            vm.task_level= coreService.covertCategoryValueIdToInt(result["LEVELTYPE2"]);
            vm.task_cycle= coreService.covertCategoryValueIdToInt(result["TASKCYCLE"]);
            vm.task_status= coreService.covertCategoryValueIdToInt(result["TASKSTATUS"]);
            vm.task_classes= coreService.covertCategoryValueIdToInt(result["TASKCLASSES"]);

        }

        //添加监测品种
        function addMonitorGoods() {
            var params = {name:'name'};
            ngDialog.open({
                title: '添加监测品种',
                template:"./priceMonitorManage/monitorTaskManage/addTask/addMonitorGoods/addMonitorGoods.html",
                height:'750px',
                width:'800px',
                controller:'AddMonitorGoodsController as vm',
                data:params,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './priceMonitorManage/monitorTaskManage/addTask/addMonitorGoods/addMonitorGoods.controller.js',
                            './priceMonitorManage/monitorTaskManage/addTask/addMonitorGoods/addMonitorGoods.service.js',
                            'My97DatePicker',
                            'pagination',
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function (resp) {
                    console.log(resp);
                    _.map(resp,function (item) {
                        vm.addGoods.push(item);
                    });

                }
            });
        }

        //添加监测指标
        function addMonitorIndicators() {
            var params = {name:'name'};
            ngDialog.open({
                title: '添加监测指标',
                template:"./priceMonitorManage/monitorTaskManage/addTask/addMonitorIndicators/addMonitorIndicators.html",
                height:'750px',
                width:'800px',
                controller:'AddMonitorIndicatorsController as vm',
                data:params,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './priceMonitorManage/monitorTaskManage/addTask/addMonitorIndicators/addMonitorIndicators.controller.js',
                            './priceMonitorManage/monitorTaskManage/addTask/addMonitorIndicators/addMonitorIndicators.service.js',
                            'My97DatePicker',
                            'pagination',
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function (resp) {
                    _.map(resp,function (item) {
                        item.selected = false;
                        vm.monitorIndicators.push(item);
                    });

                }
            });
        }
        //按钮添加一行
        function addOneGoodsKind() {
            vm.addGoods.push({name:''});
        }

        function selectItem(item) {
            item.selected=!item.selected;

        }





    }


})();

