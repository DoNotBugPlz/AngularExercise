/**
 * Created by xmr on 2018年8月22日 09:38:16
 */
(function () {
    'use strict';
    angular
        .module('app.exchange')
        .controller('ExchangeCtrl', ExchangeCtrl);
    ExchangeCtrl.$inject = ['$scope', '$stateParams', 'exchangeService', 'coreService', 'pageInfDefault', 'ngDialog', '_'];

    /* @ngInject */
    function ExchangeCtrl($scope, $stateParams, exchangeService, coreService, pageInfDefault, ngDialog, _) {
        var vm = this;
        window.a = vm;
        //加载数据列表
        vm.loadExchangeList = loadExchangeList;
        //重置
        vm.reset = reset;
        //新增
        vm.addExchange = addExchange;
        //查看
        vm.viewExchange = viewExchange;
        //回复
        vm.answerExchange = answerExchange;
        //删除
        vm.deleteExchange = deleteExchange;


        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;

        function selectAll() {
            vm.allSelected = !vm.allSelected;
            if (!angular.isUndefined(vm.exchangeList)) {
                _.forEach(vm.exchangeList, function (item) {
                    item.selected = vm.allSelected;
                })

            }
        }

        function selectItem(item) {
            item.selected = !item.selected;
        }

        /*****/
        var setExchangeList = setExchangeList;
        var refreshList = refreshList;

        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };

        activate();

        ////////////////
        function activate() {
            //高级检索
            super_sel();
            //加载数据列表
            loadExchangeList();
            //加载字典项
            coreService.getCategoryValues('YESNO')
                .then(setCategoryValues);
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.yesnoCatagory = coreService.covertCategoryValueIdToInt(result["YESNO"]);
        }

        //重置
        function reset() {
            vm.searchParams = {};
        }

        //高级检索
        function super_sel() {
            $(".super_sel").click(function () {

                if (!$(this).hasClass("up")) {
                    $(this).addClass("up");
                    $(".leftSel_zzy2").removeClass("over_hide");
                } else {
                    $(this).removeClass("up");
                    $(".leftSel_zzy2").addClass("over_hide");
                }

            })
        }

        //加载数据列表
        function loadExchangeList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            exchangeService.loadExchangeList(params)
                .then(function (response) {
                    setExchangeList(response, params.pageNumber)
                });
        }

        //新增
        function addExchange() {
            opExchange("新增提问", {});
        }

        //查看
        function viewExchange(exchange) {
            opExchange("查看交流详情", {"exchangeId": exchange.id, "is_view": true, "is_answer": true});
        }

        //回复
        function answerExchange(exchange) {
            opExchange("回复", {"exchangeId": exchange.id, "is_answer": true});
        }

        //打开详情页
        function opExchange(title, params) {
            ngDialog.open({
                title: title,
                template: "exchange/detail/exchange.detail.html",
                height: '500px',
                width: '800px',
                controller: 'exchangeDetailCtrl as vm',
                data: params,
                resolve: {
                    loadExchangeDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './exchange/detail/exchange.detail.controller.js',
                            './exchange/detail/exchange.detail.service.js',
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

        //删除
        function deleteExchange(exchange) {
            var exchangeIds = exchange.id;
            if (angular.isUndefined(exchangeIds) || exchangeIds === '') {
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？", function () {
                var params = {"exchange_ids": exchangeIds};
                exchangeService.deleteExchange(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }

        //刷新列表
        function refreshList() {
            loadExchangeList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }

        function setExchangeList(response, pageNum) {
            var result = response.data;
            vm.exchangeList = result.rows;
            vm.exchangeListPage = angular.extend({pageTurn: 'loadExchangeList', pagenum: pageNum}, result);
        }

    }

})();

