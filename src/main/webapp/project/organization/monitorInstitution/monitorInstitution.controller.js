/**
 * Created by cr on 2018/8/27
 * 监测机构管理
 */
(function () {
    'use strict';

    angular
        .module('app.monitorInstitution')
        .controller('MonitorInstitutionCtrl', MonitorInstitutionCtrl);

    MonitorInstitutionCtrl.$inject = ['$q','$state','$scope','ngDialog','monitorInstitutionService','localStorageService','coreService','$stateParams'];

    /* @ngInject */
    function MonitorInstitutionCtrl($q,$state,$scope,ngDialog,monitorInstitutionService,localStorageService,coreService,$stateParams) {
        var vm = this;
        vm.addDeptOrMonitor = addDeptOrMonitor;

        activate();

        function activate() {
            coreService.getCategoryValues('YESNO','DEPTPROPERTY')
                .then(setCategory)
                .then(initPage)
                .then(loadDeptTree);

        }

        /////////////////////////////////

        /** 设置加载项和获取当前登录用户 */
        function setCategory(response){
            //获取当前登录用户信息
            vm.user = localStorageService.get("currentUser")||{};
            vm.curUserDeptId = vm.user.deptid;
            //获取字典项
            var result = response.data;
            vm.yesnoCatagory = coreService.covertCategoryValueIdToInt(result["YESNO"]) || [];
            vm.deptProperty = coreService.covertCategoryValueIdToInt(result['DEPTPROPERTY']) || [];
            return response;
        }

        /** 初始化页面 */
        function initPage(response){
            vm.monitor_flag = false;
            vm.dept_flag = false;
            vm.parentId = "";

            //判断用户是否是省级管理员
            vm.isProvinceManager = false;
            if(vm.user.personroles && vm.user.personroles.indexOf("99999") > -1) vm.isProvinceManager = true;
            return response;
        }

        /** 获取部门树 */
        function loadDeptTree() {
            monitorInstitutionService.loadDeptTree()
                .then(setDeptTree);
        }

        /** 设置部门树 */
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

        ////////////////////////////////////

        function chooseNode(e, treeId, treeNode){
            var deptId = treeNode.id;
            vm.dept_properties = treeNode.dept_properties || "";
            vm.parentId = treeNode.parentid;
            vm.parentName = treeNode.chinaname;
            vm.addParentId = treeNode.id; //添加机构和部门时上级部门ID

            if(vm.isProvinceManager && treeNode.deptlevel == 1 && vm.dept_properties != 3){
                //是省级管理员操作
                vm.monitor_flag = true;
            }else{
                vm.monitor_flag = false;
            }

            if(treeNode.deptlevel == 1 && deptId == vm.curUserDeptId){
                vm.dept_flag = true;
            }else{
                vm.dept_flag = false;
            }

            //当前选中的节点是机构
            if(treeNode.deptlevel == 1){
                //则判断deptid是不是当前用户的部门
                if(vm.curUserDeptId == deptId){
                    $state.go('monitorInstitution.detail', {deptId:deptId,deptType:treeNode.deptlevel,editFlag:'edit'});
                }else{
                    $state.go('monitorInstitution.detail_view', {deptId:deptId,deptType:treeNode.deptlevel,editFlag:'edit'});
                }
            }else if(treeNode.deptlevel == 2){//当前选中的节点是部门
                //判断parentID是不是当前用户的部门
                if(vm.curUserDeptId == vm.parentId){
                    $state.go('monitorInstitution.detail', {deptId:deptId,deptType:treeNode.deptlevel,editFlag:'edit'});
                }else{
                    $state.go('monitorInstitution.detail_view', {deptId:deptId,deptType:treeNode.deptlevel,editFlag:'view'});
                }
            }
        }

        ///////////////////////////////////////

        function addDeptOrMonitor(opFlag){
            //opFlag添加标识 1 为监测机构 2为部门
            var params = {
                parentId:vm.addParentId,
                parentName:vm.parentName,
                deptType:opFlag,
                dept_properties:vm.dept_properties+1,//添加部门或机构比上级单位多1
                editFlag:'add'
            };

            var title = opFlag==1? '新增机构':'新增部门';

            //添加部门或机构弹窗
            ngDialog.open({
                title: title,
                template:"organization/monitorInstitution/detail/monitorInstitution_detail.html",
                height:'550px',
                width:'800px',
                controller:'MonitorInstitutionDetailCtrl as vm',
                data:params,
                resolve: {
                    loadMonitorInstitutionEdit: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './organization/monitorInstitution/detail/monitorInstitution_detail.controller.js',
                            './organization/monitorInstitution/monitorInstitution.service.js',
                            './utils/app.checkboxSel.js',
                            'My97DatePicker',
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    loadDeptTree();
                }
            });
            //$state.go('organization.deptDetail', {deptId:"",parentId:vm.parentId,deptType:opFlag});
        }



    }
})();

