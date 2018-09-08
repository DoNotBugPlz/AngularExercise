/**
 * @author maxzhao
 * @time 2018/08/27.
 */
(function () {
    'use strict';

    angular
        .module('app.querymonitordata')
        .controller('QuerymonitordataOtherShareCtrl', QuerymonitordataOtherShareCtrl);
    QuerymonitordataOtherShareCtrl.$inject = ['$scope', 'querymonitordataOtherShareService', 'pageInfDefault', 'ngDialog', '$sce', '$q', '_', '$window'];

    /* @ngInject */
    function QuerymonitordataOtherShareCtrl($scope, querymonitordataOtherShareService, pageInfDefault, ngDialog, $sce, $q, _, $window) {
        var os = this;
        window.os = os;
        os.loadList = loadList;
        os.reset = reset;
        /** 初始化 **/
        var loadOSSuccess = loadOSSuccess;
        /** 初始化列表 **/
        var loadOSListSuccess = loadOSListSuccess;
        os.selectAll = selectAll;
        os.selectItem = selectItem;
        /** 收藏所有 **/
        os.addAllCollect = addAllCollect;
        os.addCollect = addCollect;
        os.viewData = viewData;
        /*默认页码*/
        os.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };

        function active() {
            $q.all([
                querymonitordataOtherShareService.loadOSList({})
            ]).then(loadOSSuccess);
        }

        function loadOSSuccess(responses) {
            loadOSListSuccess(responses[0]);
        }

        function loadList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || os.currentPageInf.pageNumber,
                pageSize: pageSize || os.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, os.searchParams);
            os.currentPageInf = angular.extend(os.currentPageInf, pageInf);
            querymonitordataOtherShareService.loadOSList(params).then(loadOSListSuccess);
        }

        function reset() {
            os.searchParams = {};
        }

        function loadOSListSuccess(response) {
            os.dataList = response.data.rows;
        }

        function selectAll() {
            os.allSelected = !os.allSelected;
            if (!angular.isUndefined(os.dataList)) {
                _.forEach(os.dataList, function (item) {
                    item.selected = os.allSelected;
                });
            }
        }

        function selectItem(n) {
            n.selected = !n.selected;
        }

        function addAllCollect() {
            addCollect({"id": getAllSelectId().join(",")});
        }

        function addCollect(item) {
            if (angular.isUndefined(item.id) || item.id === '') {
                AppTools.errorTips("请选择要收藏的记录");
                return;
            }
            // AppTools.confirm("确定收藏所选记录吗？", function () {
            var params = {'ids': item.id};
            querymonitordataOtherShareService.addCollect(params)
                .then(function () {
                    AppTools.successTips("收藏成功！");
                    active();
                });
            // });
        }

        function viewData(item) {
            var title = '查询';
            var params = {
                'is_view': 1,
                'biUrl': item.build_url
            };
            opNgDialog(title, params);
        }

        function opNgDialog(title, params) {
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            ngDialog.open({
                title: title,
                template: "priceMonitorGoods/queryAnalysisData/detail/querymonitordata.detail.html",
                height: height * 0.9 + 'px',
                width: width * 0.9 + 'px',
                controller: 'QuerymonitordataDetailCtrl as vm',
                data: params,
                resolve: {
                    loadEditFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './priceMonitorGoods/queryAnalysisData/detail/querymonitordata.detail.controller.js',
                            './priceMonitorGoods/queryAnalysisData/detail/querymonitordata.detail.service.js'
                        ]);
                    }
                },
                preCloseCallback: function () {

                }
            });
        }

        function getAllSelectId() {
            return _.map(_.filter(os.dataList, function (item) {
                return item.selected;
            }), function (item) {
                return item.id;
            });
        }

        active();
    }
})();
