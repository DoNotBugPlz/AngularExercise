(function () {
    'use strict';

    angular
        .module('app.masterplate')
        .controller('trendCtrl', trendCtrl);

    trendCtrl.$inject = ['$scope', 'ngDialog', 'coreService', 'trendService'];

    /* @ngInject */
    function trendCtrl($scope, ngDialog, coreService, trendService) {
        var vm = this;
        //加载走势列表
        var loadTrendList = loadTrendList;
        //添加走势
        vm.addTrend = addTrend;
        //删除走势
        vm.delTrend = delTrend;
        //编辑走势
        vm.editTrend = editTrend;
        //关闭弹窗页
        vm.cancelOp = cancelOp;

        activate();

        ////////////////
        function activate() {
            loadTrendList();
        }

        //加载详细信息
        function loadTrendList() {
            trendService.loadTrendList()
                .then(setExchange);
        }

        function setExchange(response) {
            vm.parentList = [];
            vm.childrenList = [];
            _.forEach(response.data.rows, function (e) {
                if (e.is_parent == 1) {
                    vm.parentList.push(e);
                } else if (e.is_parent == 0) {
                    vm.childrenList.push(e);
                }
            });

            _.forEach(vm.parentList, function (p) {
                var childs = [];
                var childrenNames = [];
                _.forEach(vm.childrenList, function (c) {
                    if (c.parent_id == p.id) {
                        childrenNames += c.name + "、";
                        childs.push(c);
                    }
                });
                if (childrenNames.length > 0) {
                    p.childrenNames = childrenNames;
                }
                if (childs.length > 0) {
                    p.childs = childs;
                }
            });
        }

        //删除走势
        function delTrend(n) {
            var trendId = [];
            trendId.push(n.id);
            _.forEach(n.childs, function (c) {
                trendId.push(c.id);
            });
            var trendIds = trendId.join(",");
            if (angular.isUndefined(trendIds) || trendIds === '') {
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除该走势吗？", function () {
                var params = {"trendIds": trendIds};
                trendService.delTrend(params).then(function () {
                    loadTrendList();
                    AppTools.successTips("删除成功！");
                });
            });

        }

        //添加走势
        function addTrend() {
            opAddTrend("添加走势", {});
        }

        //编辑走势
        function editTrend(trend) {
            opAddTrend("添加走势", {"id": trend.id, "name": trend.name, "childrenList": trend.childs});
        }

        //打开详情页
        function opAddTrend(title, params) {
            ngDialog.open({
                title: title,
                template: "masterplate/addTrend/addTrend.html",
                height: '500px',
                width: '800px',
                controller: 'addTrendCtrl as vm',
                data: params,
                resolve: {
                    loadTrendDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './masterplate/addTrend/addTrend.controller.js',
                            './masterplate/addTrend/addTrend.service.js',
                            'ng-zTree',
                            'My97DatePicker'
                        ]);
                    }
                },
                preCloseCallback: function () {
                    loadTrendList();
                }
            });
        }

        //关闭弹窗
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


    }
})();

