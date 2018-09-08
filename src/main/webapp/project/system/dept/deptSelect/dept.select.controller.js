(function () {
    'use strict';

    angular
        .module('app.dept')
        .controller('DeptSelectCtrl', DeptSelectCtrl);

    DeptSelectCtrl.$inject = ['$scope','$stateParams','deptSelectService','ngDialog'];

    /* @ngInject */
    function DeptSelectCtrl($scope,$stateParams,deptSelectService,ngDialog) {
        var zTreeSettingParams = {
            multiple:false,
            checkedInf:[]
        };
        _.extend(zTreeSettingParams,$scope.ngDialogData.zTreeSettingParams) ;

        $scope.deptSelectList = zTreeSettingParams.checkedInf;
        $scope.deptSelectShowList = zTreeSettingParams.checkedInf;
        $scope.removeNode = removeNode;
        $scope.saveSelectOp = saveSelectOp;

        $scope.cancelOp = cancelOp;
        $scope.searchDeptShowList = searchDeptShowList;
        var loadDeptTree = loadDeptTree;
        activate();
        function activate() {
            loadDeptTree() ;
        }
        function loadDeptTree() {
            deptSelectService.loadDeptTree()
                .then(setDeptTree);
        }
        function setDeptTree(response) {
            var result = response.data.rows;
            //result=[{id:1,pid:0,name:"测试1"},{id:2,pid:0,name:"测试2"}];
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../Sys_dept/LoadListDeptTree.do',
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
            $scope.deptSelectParams = {
                setting: setting,
                zNodes: zNodes
            };
            function zTreeFilter(treeId, parentNode, childNodes) {
                if (!childNodes) return null;
                return _.map(childNodes, zNodeFilter);
            }
            function zNodeFilter(node) {
                node.isParent = node.state=='open'?false:true;
                node.name = node.text;
                var temp = _.find($scope.deptSelectList, {id: node.id});
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
            var deptId = treeNode.id;
            var deptName = treeNode.name;
            $scope.$apply(function () {
                var treeObj = $.fn.zTree.getZTreeObj("deptSelectTree");
                $scope.deptSelectList = treeObj.getCheckedNodes();
                $scope.deptSelectShowList= $scope.deptSelectList;
            });
        }
        function removeNode(obj) {
            $scope.deptSelectList=_.remove($scope.deptSelectList, function(n) {
                return n.id != obj.id;
            });
            $scope.deptSelectShowList= $scope.deptSelectList;

            $scope.$broadcast("zTreeCheckNode",{treeNode:null, checked:false, checkTypeFlag:true,callbackFlag:false,treeNodeDataId:obj.id});

        }
        //列表查询
        function searchDeptShowList() {
            if($scope.deptShowKeyword){
                $scope.deptSelectShowList=_.filter($scope.deptSelectList, function(n) {
                    return n.name.indexOf($scope.deptShowKeyword)>-1;
                });
            }else{
                $scope.deptSelectShowList= $scope.deptSelectList;
            }
            
        }
        function saveSelectOp() {
            var reData = {selectData:$scope.deptSelectList,changeInf:true};
            ngDialog.close($scope.ngDialogId,reData);
        }


        function cancelOp() {
            var reData = {selectData:$scope.deptSelectList,changeInf:false};
            ngDialog.close($scope.ngDialogId,reData);
        }

    }
})();

