(function () {
    'use strict';
    angular
        .module('app.masterplate')
        .controller('MasterplateCtrl', MasterplateCtrl);
    MasterplateCtrl.$inject = ['$state', '$scope', '$stateParams', 'masterplateService', 'coreService', 'pageInfDefault', 'ngDialog', '_'];

    /* @ngInject */
    function MasterplateCtrl($state, $scope, $stateParams, masterplateService, coreService, pageInfDefault, ngDialog, _) {
        var vm = this;
        //加载数据列表
        vm.loadMasterplateList = loadMasterplateList;
        //重置
        vm.reset = reset;
        //新增模版
        vm.addMasterplate = addMasterplate;
        //编辑模版
        vm.editMasterplate = editMasterplate;
        //启用、停用
        vm.changeStatue = changeStatue;
        //走势配置
        vm.addTrend = addTrend;

        /*****/
        var setMasterplateList = setMasterplateList;
        var refreshList = refreshList;

        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };

        /*默认状态*/
        vm.category_delstatus = [{id: 0, chinaname: "已启用"}, {id: 1, chinaname: "已停用"}];
        activate();

        ////////////////
        function activate() {
            //加载数据列表
            loadMasterplateList();
            //加载字典项
            coreService.getCategoryValues('MASTERPLATETYPE')
                .then(setCategoryValues);
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.masterplatetypeCatagory = coreService.covertCategoryValueIdToInt(result["MASTERPLATETYPE"]);
        }

        //重置
        function reset() {
            vm.searchParams = {};
        }

        //新增模版
        function addMasterplate() {
            $state.go('masterplate.detail', {});
        }

        //编辑模版
        function editMasterplate(masterplate) {
            $state.go('masterplate.detail', {id: masterplate.id});
        }

        function changeStatue(id,value) {
            var params = {id:id,delstatue:value};
            masterplateService.changeStatue(params)
                .then(function (resp) {
                    refreshList();
                });
        }

        //加载数据列表
        function loadMasterplateList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            masterplateService.loadMasterplateList(params)
                .then(function (response) {
                    setMasterplateList(response, params.pageNumber)
                });
        }

        //走势配置
        function addTrend() {
            opTrend("添加走势", {});
        }

        //打开走势配置页
        function opTrend(title, params) {
            ngDialog.open({
                title: title,
                template: "masterplate/trend/trend.html",
                height: '500px',
                width: '800px',
                controller: 'trendCtrl as vm',
                data: params,
                resolve: {
                    loadTrendFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './masterplate/trend/trend.controller.js',
                            './masterplate/trend/trend.service.js',
                            'ng-zTree',
                            'My97DatePicker'
                        ]);
                    }
                }
            });
        }

        //刷新列表
        function refreshList() {
            loadMasterplateList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }

        function setMasterplateList(response, pageNum) {
            var result = response.data;
            vm.masterplateList = result.rows;
            vm.masterplateListPage = angular.extend({pageTurn: 'loadMasterplateList', pagenum: pageNum}, result);
        }

    }

})();

