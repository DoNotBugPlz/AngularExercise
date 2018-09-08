/**
 * Created by chencl on 2018/8/8
 * 监测机构管理
 */
(function () {
    'use strict';

    angular
        .module('app.organization')
        .controller('OrganizationCtrl', OrganizationCtrl);

    OrganizationCtrl.$inject = ['$state','$scope','organizationService'];

    /* @ngInject */
    function OrganizationCtrl($state,$scope,organizationService) {
        var vm = this;
        vm.monitor_flag = false;
        vm.dept_flag = false;
        vm.parentId = "";
        vm.addNewdept = addNewdept;
        vm.addMonitorCenter = addMonitorCenter;
        var loadDeptTree = loadDeptTree;
        function activate() {
            loadDeptTree() ;
        }
        activate();
        function loadDeptTree() {
            organizationService.loadDeptTree()
                .then(setDeptTree);
        }
        function setDeptTree(response) {
            var result = response.data.rows;
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../Cf_dept_ext/LoadPageListForConfig.do',
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
            var dept_properties = treeNode.dept_properties;
            vm.parentId = deptId;
            if(dept_properties == 3){        //县级 监测中心
                vm.monitor_flag = false;
                vm.dept_flag = true;
                $state.go('organization.monitorDetail', {deptId:deptId});
            }else if(treeNode.deptlevel == 1){        // 监测中心
                vm.monitor_flag = true;
                vm.dept_flag = true;
                $state.go('organization.monitorDetail', {deptId:deptId});
            }else{   // 部门
                vm.monitor_flag = false;
                vm.dept_flag = false;
                $state.go('organization.deptDetail', {deptId:deptId});
            }
        }

        function addNewdept(){
            $state.go('organization.deptDetail', {deptId:"",parentId:vm.parentId});
        }

        function addMonitorCenter(){
            $state.go('organization.monitorDetail', {deptId:"",parentId:vm.parentId});
        }

    }
})();

