(function () {
    'use strict';

    angular
        .module('app.area')
        .controller('AreaSelectCtrl', AreaSelectCtrl);

    AreaSelectCtrl.$inject = ['$scope','$stateParams','areaSelectService','ngDialog'];

    /* @ngInject */
    function AreaSelectCtrl($scope,$stateParams,areaSelectService,ngDialog) {
        var zTreeSettingParams = {
            multiple:false,
            checkedInf:[]
        };
        _.extend(zTreeSettingParams,$scope.ngDialogData.zTreeSettingParams) ;

        $scope.areaSelectList = zTreeSettingParams.checkedInf;
        $scope.areaSelectShowList = zTreeSettingParams.checkedInf;
        $scope.removeNode = removeNode;
        $scope.saveSelectOp = saveSelectOp;

        $scope.cancelOp = cancelOp;
        $scope.searchAreaShowList = searchAreaShowList;
        var loadAreaTree = loadAreaTree;
        activate();
        function activate() {
            loadAreaTree() ;
        }
        function loadAreaTree() {
            areaSelectService.loadAreaTree()
                .then(setAreaTree);
        }
        function setAreaTree(response) {
            var result = response.data;
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url:"../Cf_area/LoadListAreaTree.do",
                    autoParam: ["id"],
                    contentType: "application/json",
                    type: 'get',
                    dataType: "text",
                    dataFilter: zTreeFilter
                },
                check: {
                    enable: true,
                    chkboxType: { "Y": "", "N": "" }
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
                    onCheck:checkNode,
                    beforeCheck: zTreeBeforeCheck,
                    onClick:chooseNode

                }
            };
            zNodes = _.map(result, zNodeFilter);
            $scope.areaSelectParams = {
                setting: setting,
                zNodes: zNodes
            };
            function zTreeFilter(treeId, parentNode, childNodes) {
                if (!childNodes) return null;
                return _.map(childNodes.data, zNodeFilter);
            }
            function zNodeFilter(node) {
                node.isParent = node.state=='open'?false:true;
                node.name = node.text;
                var temp = _.find($scope.areaSelectList, {id: node.id});
                if(temp){
                    node.checked = true;
                }else{
                    node.checked = false;
                }
                return node;
            }
        }
        function checkNode(e, treeId, treeNode) {
            checkNodeAfter(treeNode);
        }
        function zTreeBeforeCheck() {
            if(!zTreeSettingParams.multiple){
                $scope.$broadcast("zTreeCancelSelectedNode");
            }
        }
        function chooseNode(e, treeId, treeNode){
            $scope.$broadcast("zTreeCheckNode",{treeNode:treeNode, checked:!treeNode.checked, checkTypeFlag:true,callbackFlag:true});
        }
        function checkNodeAfter(treeNode) {
            var areaId = treeNode.id;
            var areaName = treeNode.name;
            $scope.$apply(function () {
                var treeObj = $.fn.zTree.getZTreeObj("areaSelectTree");
                $scope.areaSelectList = treeObj.getCheckedNodes();
                $scope.areaSelectShowList= $scope.areaSelectList;
            });
        }
        function removeNode(obj) {
            $scope.areaSelectList=_.remove($scope.areaSelectList, function(n) {
                return n.id != obj.id;
            });
            $scope.areaSelectShowList= $scope.areaSelectList;

            $scope.$broadcast("zTreeCheckNode",{treeNode:null, checked:false, checkTypeFlag:true,callbackFlag:false,treeNodeDataId:obj.id});

        }
        //列表查询
        function searchAreaShowList() {
            if($scope.areaShowKeyword){
                $scope.areaSelectShowList=_.filter($scope.areaSelectList, function(n) {
                    return n.name.indexOf($scope.areaShowKeyword)>-1;
                });
            }else{
                $scope.areaSelectShowList= $scope.areaSelectList;
            }

        }
        function saveSelectOp() {
            var reData = {selectData:$scope.areaSelectList,changeInf:true};
            ngDialog.close($scope.ngDialogId,reData);
        }


        function cancelOp() {
            var reData = {selectData:$scope.areaSelectList,changeInf:false};
            ngDialog.close($scope.ngDialogId,reData);
        }

    }
})();

