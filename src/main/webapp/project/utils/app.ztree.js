/**
 * angularjs ztree 插件
 * Created by pancuican@1193 on 2017/6/9.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ztree', ztree);

    ztree.$inject = ['$', '_'];

    /* @ngInject */
    function ztree($, _) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                zParams: '=',
                zSelectedNodes: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            scope.refresh = refresh;
            scope.cancel = cancel;
            scope.expandAll = expandAll;
            scope.expandNodes = expandNodes;
            scope.treeid = attrs.id;
            scope.asyncLoad = false;
            var curAsyncCount = 0;
            var goAsync = false;
            var curStatus = "init";
            var onAsyncSuccess = onAsyncSuccess;
            var beforeAsync = beforeAsync;
            var zTreeOnCheck = zTreeOnCheck;
            activate();


            /////////////////////

            function activate() {

                scope.$watch("zParams", function (current, prev) {
                    if (current !== undefined) {// && prev===undefined
                        if ((!angular.isUndefined(scope.zParams.setting.async)) &&
                            scope.zParams.setting.async.enable && scope.zParams.setting.async.initSelect) {
                            scope.zParams.setting.callback = (angular.isUndefined(scope.zParams.setting.callback) ? {} : scope.zParams.setting.callback);
                            scope.zParams.setting.callback.onAsyncSuccess = onAsyncSuccess;
                            scope.zParams.setting.callback.beforeAsync = beforeAsync;
                            scope.zParams.setting.callback.onCheck = zTreeOnCheck;
                            $.fn.zTree.init($(element), scope.zParams.setting);
                            scope.asyncLoad = true;
                        } else if (!angular.isUndefined(scope.zParams.zNodes)) {
                            $.fn.zTree.init($(element), scope.zParams.setting, scope.zParams.zNodes);
                        } else {
                            $fn.zTree.init($(element), scope.zParams.setting);
                        }
                    }
                });
                scope.$on('zTreeCheckNode', checkNode);
                scope.$on('zTreeCancelSelectedNode', cancel);
                scope.$on('zTreeRefreshEvent', refresh);
                scope.$on('zTreeExpandAllEvent', expandAll);
                scope.$on('zTreeExpandNodeEvent', expandNodes);
            }

            function checkNode(event,treeNodeData) {
                var treeObj = $.fn.zTree.getZTreeObj(scope.treeid);
                if(!treeNodeData.treeNode){
                    treeNodeData.treeNode = treeObj.getNodeByParam("id", treeNodeData.treeNodeDataId, null);
                }
                if(treeNodeData.treeNode){
                    treeObj.checkNode(treeNodeData.treeNode, treeNodeData.checked, treeNodeData.checkTypeFlag, treeNodeData.callbackFlag);
                }

            }

            function refresh(event, id) {
                var treeObj = $.fn.zTree.getZTreeObj(scope.treeid);

                if (id === '0') {
                    _.forEach(treeObj.getNodes(), function (node) {
                        treeObj.reAsyncChildNodes(node, "refresh");
                    });
                } else if (id){
                    _.forEach(treeObj.getNodesByParam("id", id, null), function (node) {
                        treeObj.reAsyncChildNodes(node, "refresh");
                    });
                } else {
                    treeObj.reAsyncChildNodes(null, "refresh");
                }

            }

            function cancel() {
                var treeObj = $.fn.zTree.getZTreeObj(scope.treeid);
                //treeObj.cancelSelectedNode();
                treeObj.checkAllNodes(false);
            }

            function expandAll() {
                var treeObj = $.fn.zTree.getZTreeObj(scope.treeid);
                if (!check()) return;
                expandNodes(treeObj.getNodes());
                if (!goAsync) {
                    curStatus = "";
                }
            }

            function expandNodes(nodes) {
                var treeObj = $.fn.zTree.getZTreeObj(scope.treeid);
                _.forEach(nodes, function (node) {
                    treeObj.expandNode(node, true, false, false);//展开节点就会调用后台查询子节点
                    if (node.isParent && node.zAsync) {
                        expandNodes(treeObj, node.children);//递归
                    } else {
                        goAsync = true;
                    }
                });
            }

            function check() {
                return curAsyncCount <= 0;
            }

            function beforeAsync() {
                curAsyncCount++;
            }

            function zTreeOnCheck() {
                scope.$apply(function () {
                    var treeObj = $.fn.zTree.getZTreeObj(scope.treeid);
                    scope.zSelectedNodes = treeObj.getCheckedNodes();
                });
            }

            function onAsyncSuccess(event, treeId, treeNode, msg) {
                curAsyncCount--;
                if (curStatus === 'expand') {
                    expandNodes(treeNode.children);
                }
                if (scope.asyncLoad && curStatus === 'init') {
                    curStatus = 'expand';
                    expandAll();
                }
                zTreeOnCheck();
            }
        }
    }





})();


