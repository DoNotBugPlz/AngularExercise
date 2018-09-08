(function () {
    'use strict';

    angular
        .module('app.dept')
        .controller('DeptCtrl', DeptCtrl);

    DeptCtrl.$inject = ['$state','$scope','deptService'];

    /* @ngInject */
    function DeptCtrl($state,$scope,deptService) {
        var vm = this;
        vm.addNewdept = addNewdept;
        var loadDeptTree = loadDeptTree;
        function activate() {
            loadDeptTree() ;
        }
        function loadDeptTree() {
            deptService.loadDeptTree()
                .then(setDeptTree);
        }
        function setDeptTree(response) {
            var result = response.data.rows;
            //result=[{id:1,pid:0,name:"测试1"},{id:2,pid:0,name:"测试2"}];
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../Sys_dept/LoadPageListForConfig.do',
                    autoParam: ["id"],
                    contentType: "application/json",
                    type: 'get',
                    dataType: "text",
                    dataFilter: zTreeFilter
                },
                check: {
                    enable: false
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
                    onClick: chooseNode
                }
            };
            zNodes = _.map(result, zNodeFilter);
            vm.zParams = {
                setting: setting,
                zNodes: zNodes
            };
            function zTreeFilter(treeId, parentNode, childNodes) {
                if (!childNodes) return null;
                return _.map(childNodes.rows, zNodeFilter);
            }
            function zNodeFilter(node) {
                node.checked = false;
                node.isParent = node.state=='open'?false:true;
                node.name = node.chinaname;
                if(node.delstatus){
                    node.icon="../project/lib/ztree/css/zTreeStyle/img/diy/del.png"
                }
                return node;
            }
        }

        function chooseNode(e, treeId, treeNode){
            var deptId = treeNode.id;
            $state.go('deptDetail', {deptId:deptId});
        }

        function addNewdept(){
            $state.go('deptDetail', {deptId:""});
        }


        activate();

    }
})();


