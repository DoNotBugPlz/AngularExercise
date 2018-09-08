/**
 * @author maxzhao
 * @time 2018/08/15.
 */
(function () {
    'use strict';
    angular
        .module('app.office')
        .controller('treeCtrl', treeCtrl);
    treeCtrl.$inject = ['treeService', '$scope', 'ngDialog', '$q'];

    function treeCtrl(treeService, $scope, ngDialog, $q) {
        var vm = this;
        window.tree = vm;
        vm.user_ids = $scope.ngDialogData.user_ids ? ',' + $scope.ngDialogData.user_ids + ',' : $scope.ngDialogData.user_ids;
        vm.deptUserShowList = $scope.ngDialogData.userList;
        var is_one = $scope.ngDialogData.is_one;
        vm.treeNodesOfAll = [];
        var multiple = false;
        /*传入数据格式为{'name':t_notice}*/
        var deptUserShowListFilter = deptUserShowListFinter;
        var getDeptUsersSuccess = getDeptUsersSuccess;
        var loadSuccess = loadSuccess;
        var setObjectTree = setObjectTree;
        vm.confirmOp = confirmOp;
        vm.cancelOp = cancelOp;
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        vm.removeNode = removeNode;

        function activate() {
            vm.callBackData = {};
            _.map(vm.deptUserShowList, function (data) {
                vm.callBackData[data.id] = data;
            });
            $q.all([
                treeService.loadObjectTree()
            ]).then(loadSuccess);
        }

        function loadSuccess(responses) {
            setObjectTree(responses[0]);
        }

        function setObjectTree(response) {
            var result = response.data;
            vm.zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../T_notice/tree/object.do',
                    autoParam: ["id"],
                    contentType: "application/json",
                    type: 'get',
                    dataType: "text",
                    dataFilter: zTreeFilter
                },
                check: {
                    enable: true,
                    chkboxType: {"Y": "", "N": ""}
                },
                view: {
                    nameIsHTML: true
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                edit: {
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false,
                    drag: {
                        isMove: true,
                        prev: true,
                        inner: true,
                        next: true,
                        autoExpandTrigger: true
                    }
                },
                callback: {
                    onCheck: checkNode,
                    onClick: chooseNode,
                    beforeCheck: zTreeBeforeCheck
                }
            };
            vm.zNodes = _.map(result, zNodeFilter);
            vm.ztreeParams = {
                setting: setting,
                zNodes: vm.zNodes
            };

            function zTreeFilter(treeId, parentNode, childNodes) {
                vm.childNodes = childNodes;
                if (!childNodes) return null;
                return _.map(childNodes.data, zNodeFilter);
            }

            function zNodeFilter(node) {
                if (vm.user_ids && vm.user_ids.indexOf(',' + node.id + ',') != -1 && (node.isParent == 'false' || node.isParent == 'f')) {
                    node.checked = true;
                    checkNode(null, null, node);
                }
                if (node.delstatus) {
                    node.icon = "../project/lib/ztree/css/zTreeStyle/img/diy/del.png"
                }
                return node;
            }
        }

        function checkNode(e, treeId, treeNode) {
            var params = {'dept_id': treeNode.dept_id};
            treeService.getDeptUsers(params).then(getDeptUsersSuccess);
        }

        function chooseNode(e, treeId, treeNode) {
            $scope.$broadcast("zTreeCheckNode", {
                treeNode: treeNode,
                checked: !treeNode.checked,
                checkTypeFlag: true,
                callbackFlag: true
            });
            var params = {'dept_id': treeNode.dept_id};
            treeService.getDeptUsers(params).then(getDeptUsersSuccess);
        }

        /* 树单选 */
        function zTreeBeforeCheck() {
            if (!multiple) {
                $scope.$broadcast("zTreeCancelSelectedNode");
            }
        }

        function getDeptUsersSuccess(response) {
            vm.deptUserList = response.data;
            vm.allSelected = false;
        }

        function confirmOp() {
            ngDialog.close($scope.ngDialogId, vm.callBackData);
        }

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        function selectAll() {
            if (is_one) {
                vm.allSelected = 1;
            }
            vm.allSelected = !vm.allSelected;
            if (!angular.isUndefined(vm.deptUserList)) {
                _.forEach(vm.deptUserList, function (item) {
                    item.selected = vm.allSelected;
                    if (vm.allSelected) {
                        vm.callBackData[item.id] = item;
                    } else {
                        delete vm.callBackData[item.id];
                    }
                });
                vm.deptUserShowList = [];
                _.mapValues(vm.callBackData, deptUserShowListFilter);
            }
        }

        function selectItem(item) {
            if (is_one) {
                selectAll();
            }

            item.selected = !item.selected;
            if (item.selected) {
                vm.callBackData[item.id] = item;
            } else {
                delete vm.callBackData[item.id];
            }
            vm.deptUserShowList = [];
            _.mapValues(vm.callBackData, deptUserShowListFilter);
        }

        function removeNode(n) {
            n.selected = false;
            delete vm.callBackData[n.id];
            vm.deptUserShowList = [];
            _.mapValues(vm.callBackData, deptUserShowListFilter);
        }

        function deptUserShowListFinter(node) {
            vm.deptUserShowList.push(node);
        }

        activate();
    }
})('../');
