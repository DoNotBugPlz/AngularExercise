(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('ShortcutMenuSelectCtrl', ShortcutMenuSelectCtrl);

    ShortcutMenuSelectCtrl.$inject = ['$scope', '$stateParams', 'shortcutMenuSelectService', 'ngDialog'];

    /* @ngInject */
    function ShortcutMenuSelectCtrl($scope, $stateParams, shortcutMenuSelectService, ngDialog) {
        var zTreeSettingParams = {
            multiple: false,
            checkedInf: []
        };
        _.extend(zTreeSettingParams, $scope.ngDialogData.zTreeSettingParams);

        $scope.shortcutSelectList = zTreeSettingParams.checkedInf;
        $scope.shortcutSelectShowList = zTreeSettingParams.checkedInf;
        $scope.removeNode = removeNode;
        $scope.saveSelectOp = saveSelectOp;

        $scope.cancelOp = cancelOp;
        $scope.searchShortcutShowList = searchShortcutShowList;
        var loadShortcutTree = loadShortcutTree;
        activate();
        function activate() {
            loadShortcutTree();
        }

        function loadShortcutTree() {
            shortcutMenuSelectService.loadShortcutTree()
                .then(setShortcutTree);
        }

        function setShortcutTree(response) {
            var result = response.data;
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../Sys_menu_ext/LoadMenuList.do',
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
                callback: {
                    onCheck: checkNode,
                    beforeCheck: zTreeBeforeCheck
                }
            };
            zNodes = _.map(result, zNodeFilter);
            $scope.shortcutSelectParams = {
                setting: setting,
                zNodes: zNodes
            };
            function zTreeFilter(treeId, parentNode, childNodes) {
                if (!childNodes) return null;
                return _.map(childNodes, zNodeFilter);
            }

            function zNodeFilter(node) {
                node.isParent = node.state == 'open' ? false : true;
                node.name = node.name;
                var temp = _.find($scope.shortcutSelectList, {menuId: node.id});
                if (temp) {
                    node.checked = true;
                } else {
                    node.checked = false;
                }
                if (node.isParent == true) {
                    node.nocheck = true;
                }
                if (node.children) {
                    _.forEach(node.children, function (obj, index) {
                        var sub = _.find($scope.shortcutSelectList, {menuId: obj.id});
                        if (sub) {
                            obj.checked = true;
                        } else {
                            obj.checked = false;
                        }
                    })
                }
                return node;
            }
        }

        function checkNode(e, treeId, treeNode) {
            checkNodeAfter(treeNode);
        }

        function zTreeBeforeCheck() {
            if (!zTreeSettingParams.multiple) {
                $scope.$broadcast("zTreeCancelSelectedNode");
            }
        }

        function checkNodeAfter(treeNode) {
            var shortcutId = treeNode.id;
            var shortcutName = treeNode.name;
            $scope.$apply(function () {
                $scope.shortcutSelectShowList = _.filter($scope.shortcutSelectShowList, function (e) {
                    return e.menuId != shortcutId;
                });
                if (treeNode.checked) {
                    $scope.shortcutSelectShowList.push({
                        menuId: shortcutId,
                        name: shortcutName
                    });
                }


                // var treeObj = $.fn.zTree.getZTreeObj("shortcutSelectTree");
                //
                //
                //
                // $scope.shortcutSelectList = treeObj.getCheckedNodes();
                // var sub = _.find($scope.shortcutSelectShowList, {menuId: shortcutId});
                // var temp = {};
                // if (!sub) {
                //     temp.menuId = shortcutId;
                //     temp.name = shortcutName;
                //     $scope.shortcutSelectShowList.push(temp);
                // }
                $scope.shortcutSelectList = $scope.shortcutSelectShowList;
            });
        }

        function removeNode(obj) {
            var id = obj.menuId;
            $scope.shortcutSelectList = _.remove($scope.shortcutSelectList, function (n) {
                return n.menuId != obj.menuId;
            });
            $scope.shortcutSelectShowList = $scope.shortcutSelectList;

            $scope.$broadcast("zTreeCheckNode", {
                treeNode: null,
                checked: false,
                checkTypeFlag: true,
                callbackFlag: false,
                treeNodeDataId: id
            });

        }

        //列表查询
        function searchShortcutShowList() {
            if ($scope.shortcutShowKeyword) {
                $scope.shortcutSelectShowList = _.filter($scope.shortcutSelectList, function (n) {
                    return n.name.indexOf($scope.shortcutShowKeyword) > -1;
                });
            } else {
                $scope.shortcutSelectShowList = $scope.shortcutSelectList;
            }

        }

        function saveSelectOp() {
            var shortcutSelectList = $scope.shortcutSelectShowList;
            var list = [];
            var params = {};
            var menu_id = "";
            if (shortcutSelectList && shortcutSelectList.length > 0) {
                angular.forEach(shortcutSelectList, function (data, index, arr) {
                    menu_id = data.menuId;
                    list.push({menu_id: menu_id});
                });
            }
            params.list = list;
            shortcutMenuSelectService.saveShortcutMenuList(params)
                .then(saveShortcutMenuListSuccess)
        }

        function saveShortcutMenuListSuccess(response) {
            AppTools.successTips("保存成功！");
            ngDialog.close($scope.ngDialogId);
        }


        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

    }
})();

