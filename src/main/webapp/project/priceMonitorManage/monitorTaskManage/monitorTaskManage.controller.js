
(function () {
    'use strict';
    angular
        .module('app.monitorTaskManage')
        .controller('MonitorTaskManageController', MonitorTaskManageController);
    MonitorTaskManageController.$inject = ['$scope', 'coreService','monitorTaskManagerService', 'pageInfDefault', 'ngDialog', '_','$state'];

    /* @ngInject */
    function MonitorTaskManageController($scope, coreService,monitorTaskManagerService, pageInfDefault, ngDialog, _,$state) {
        var vm = this;
        window.a = vm;
        vm.searchTask = searchTask;
        vm.reset = reset;

        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        vm.loadTaskList = loadTaskList;
        vm.addTask = addTask;

        activate();
        function activate() {
            loadTaskList();
            coreService.getCategoryValues('TASKTYPE,LEVELTYPE2,TASKCYCLE,TASKSTATUS,TASKCLASSES')
                .then(setCategoryValues)
                .then(function () {
                    loadTaskList();
                })



        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.task_type= coreService.covertCategoryValueIdToInt(result["TASKTYPE"]);
            vm.task_level= coreService.covertCategoryValueIdToInt(result["LEVELTYPE2"]);
            vm.task_cycle= coreService.covertCategoryValueIdToInt(result["TASKCYCLE"]);
            vm.task_status= coreService.covertCategoryValueIdToInt(result["TASKSTATUS"]);
            vm.task_classes= coreService.covertCategoryValueIdToInt(result["TASKCLASSES"]);

        }

        function loadTaskList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            monitorTaskManagerService.loadTaskList(params)
                .then(function (resp) {
                    setTaskList(resp,params.pageNumber);
                })
        }

        function setTaskList(response,pageNum) {
            var result = response.data;
            vm.taskList = result.rows;
            _.map(vm.taskList,function (item,index) {
                item.index = index+1;
            });
            vm.taskListPage = angular.extend({pageTurn: 'loadTaskList',pagenum:pageNum}, result);
        }
        function reset() {
            vm.searchParams = {};
            loadTaskList();
        }
        function searchTask() {
            loadTaskList(1,vm.currentPageInf.pageSize);
        }

        function addTask() {
            $state.go("addTask");
        }





    }


})();

