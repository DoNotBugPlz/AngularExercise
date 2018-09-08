(function () {
    'use strict';
    angular
        .module('app.monitoringPointWorker')
        .controller('MonitoringPointWorkerCtrl', MonitoringPointWorkerCtrl);
    MonitoringPointWorkerCtrl.$inject = ['$state', '$scope', '$stateParams', 'monitoringPointWorkerService', 'pageInfDefault', 'ngDialog', '_'];

    /* @ngInject */
    function MonitoringPointWorkerCtrl($state, $scope, $stateParams, monitoringPointWorkerService, pageInfDefault, ngDialog, _) {
        var vm = this;
        vm.title = 'DesktopCtrl';
        vm.addMonitoringPointWorker = addMonitoringPointWorker;
        vm.editMonitoringPointWorker = editMonitoringPointWorker;
        vm.amendMonitoringPointWorker = amendMonitoringPointWorker;
        vm.loadMonitoringPointWorkerList = loadMonitoringPointWorkerList;
        //重置
        vm.reset = reset;

        /*****/
        var setBarCodeManageList = setBarCodeManageList;
        var refreshList = refreshList;
        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };
        /*默认状态*/
        vm.category_status = [{id: 0, text: "待填报"}, {id: 1, text: "暂存"}, {id: 2, text: "退回"}];
        vm.monitoringPointWorkerList = [
            {
                id: 1,
                excelname: "城市居民食品零售价格监测",
                adress: "吉美农贸市场",
                collect_time: "2018年4月15日",
                deadline: "2018年4月15日  17:00",
                status: 0,
                status_text: "待填报"
            },
            {
                id: 2,
                excelname: "成品粮食零售价格监测",
                adress: "吉美农贸市场",
                collect_time: "2018年4月10日",
                deadline: "2018年4月15日  17:00",
                status: 0,
                status_text: "待填报"
            },
            {
                id: 3,
                excelname: "优质粮食收购价格监测",
                adress: "吉美农贸市场",
                collect_time: "2018年4月16日",
                deadline: "2018年4月16日  17:00",
                status: 1,
                status_text: "暂存"
            },
            {
                id: 4,
                excelname: "成品粮出厂价格监测",
                adress: "吉美农贸市场",
                collect_time: "2018年4月18日",
                deadline: "2018年4月19日  17:00",
                status: 2,
                status_text: "退回"
            }
        ];
        activate();

        ////////////////
        function activate() {
            // loadMonitoringPointWorkerList();
        }

        //重置
        function reset() {
            vm.searchParams = {};
        }

        function addMonitoringPointWorker(n) {
            $state.go('monitoringPointWorker.monitoringPointWrite', {excelId: n.id});
        }

        function editMonitoringPointWorker(n) {
            $state.go('monitoringPointWorker.monitoringPointWrite', {excelId: n.id});
        }

        function amendMonitoringPointWorker(n) {
            $state.go('monitoringPointWorker.monitoringPointWrite', {excelId: n.id});
        }


        //加载数据列表
        function loadMonitoringPointWorkerList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            monitoringPointWorkerService.loadMonitoringPointWorkerList(params)
                .then(function (response) {
                    setBarCodeManageList(response, params.pageNumber)
                });
        }

        //刷新列表
        function refreshList() {
            loadMonitoringPointWorkerList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }

        function setBarCodeManageList(response, pageNum) {
            var result = response.data;
            vm.barCodeManageList = result.rows;
            vm.barCodeManageListPage = angular.extend({
                pageTurn: 'loadMonitoringPointWorkerList',
                pagenum: pageNum
            }, result);
        }

    }

})();

