/**
 * Created by tr on 2018年8月6日21:01:05.
 */
(function () {
    'use strict';   // js 编写标准化
    angular
        .module('app.roles')
        .controller('RolesCtrl', RolesCtrl); // 创建ctrl
    RolesCtrl.$inject = [
        '$state',
        '$scope',
        'ngDialog',
        '_',
        'rolesService'];
    function RolesCtrl($state,$scope,ngDialog,_,rolesService) {
        var vm = this;
        var loadRolesList = loadRolesList; // 获取角色列表
        var setRolesList = setRolesList; // 将角色信息列表添加到页面
        var getAllSelectRolesId = getAllSelectRolesId;
        var setRolesList = setRolesList; // 角色list
        var setRolesMenuList = setRolesMenuList;
        vm.showRoleAuthorityBtn = false; // 控制新增按钮显示
        vm.addOrUpdateRole = addOrUpdateRole; // 新增或修改按钮
        vm.deleteRoles = deleteRoles; // 禁用
        vm.undeleteRoles = undeleteRoles; //启用
        vm.loadRolesAuthority = loadRolesAuthority; // 权限分配按钮
        vm.saveCanUseRoles = saveCanUseRoles; // 角色分配 保存按钮
        vm.saveRoleMenus = saveRoleMenus; // 菜单权限 保存按钮
        vm.roleMenuCheckAll = roleMenuCheckAll;

        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        function selectAll(infoList) {
            if(infoList ==  vm.rolesList){
                vm.allSelected=!vm.allSelected;
            }else{
                vm.allSelectedCanRoles=!vm.allSelectedCanRoles;
            }
            //vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(infoList)){
                _.forEach(infoList,function (item) {
                    if(infoList ==  vm.rolesList){
                        item.selected=vm.allSelected;
                    }else{
                        item.selected=vm.allSelectedCanRoles;
                    }

                    //item.selected=vm.allSelected;
                })
            }
        }
        function selectItem(item) {
            item.selected=!item.selected;
        }

        // 0获取选中且未禁用的记录，1获取选中且已禁用的记录，为空或其他获取所有选中的记录
        function getAllSelectRolesId(flag) {
            return _.map(_.filter(vm.rolesList,function (item) {
                if ('0' == flag || '1' == flag) {
                    return item.selected && item.delstatus == flag;
                }else {
                    return item.selected;
                }
            }),function (item) {
                return item.id;
            });
        }

       //页面加载时候载入方法
        function activate() {
            loadRolesList(); // 加载角色信息列表
        }
        activate();

        // 角色管理
        function loadRolesList() {
            rolesService.loadRolesList()
                .then(setRolesList)
        }

        function setRolesList(response) {
            vm.rolesList = response.data.rows;
        }


        // 页面调用赋值
        function setRolesList(response) {
            vm.rolesList = response.data.rows;
        }

        // 删除
        function refreshRolesList() {
            loadRolesList();
        }

        /**
         * 弹出框
         * @param type 0新增角色 1修改角色
         * @param roleinfo
         */
        function addOrUpdateRole(type,roleinfo) {
            var title = '0' == type ? '新增角色' : '修改角色信息';
            ngDialog.open({
                title: title,
                template:"./system/roles/rolesDetail/roles_detail.html",
                height:'225px',
                width:'400px',
                controller:'RolesDetailCtrl as vm', // 指向detail中创建的 controller
                data: {type: type, roleinfo: roleinfo},
                resolve: {
                    loadSysCategoryDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './system/roles/rolesDetail/roles_detail.controller.js',
                            './system/roles/rolesDetail/roles_detail.service.js',
                            './utils/app.validate.js'
                        ]);
                    }
                },
                preCloseCallback: function (value) {
                    var issave = value.issave;// 保存后刷新列表
                    if (issave) {
                        refreshRolesList();
                    }
                }
            });
        }

        // 禁用
        function deleteRoles(){
            var selectIds = getAllSelectRolesId(0).join(','); // 获取所有选择的信息ids
            if (null == selectIds || selectIds.length < 1) {
                AppTools.infoTips("请选择要禁用的角色！");
                return;
            }
            var params = {ids: selectIds};
            rolesService.deleteRoles(params)
                .then(function (response) {
                    AppTools.successTips("禁用成功！");
                    refreshRolesList();
                })
        }

        // 启用
        function undeleteRoles() {
            var selectIds = getAllSelectRolesId(1).join(',');
            if (null == selectIds || selectIds.length < 1) {
                AppTools.infoTips("请选择要启用的角色！");
                return;
            }
            var params = {ids: selectIds};
            rolesService.undeleteRoles(params)
                .then(function (response) {
                    AppTools.successTips("启用成功！");
                    refreshRolesList();
                })
        }

        //  权限分配按钮
        function loadRolesAuthority(id) {
            _.forEach(vm.rolesList,function (item) {
                if (item.id == id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            })
            vm.sysRolesAllSelected = false;// 取消角色全选
            vm.showRoleAuthorityBtn = true;// 显示角色权限分配中的保存按钮
            vm.nowSelectRoleId = id;        // 当前选中的角色ID
            loadCanUseRolesList(id); // 加载可分配角色列表
            loadRolesMenuList(id);
        }

        // 获取可分配的角色列表
        function loadCanUseRolesList(id) {
            var params = {id: id};
            rolesService.loadCanUseRolesList(params)
                .then(setCanUseRolesList)
        }
        function setCanUseRolesList(response) {
            var rows = response.data.rows;
            _.forEach(rows,function (item) {
                item.selected = (item.checked == "true") ? true : false;
            });
            var selectedArr = _.filter(rows,function (item) {
                return item.selected;
            });
            vm.canUseRolesAllSelect = (rows.length == selectedArr.length);
            vm.rolesCanUseList = rows;
        }

        // 保存角色分配
        function saveCanUseRoles() {
            var ids = getAllSelectCanUseRolesId().join(',');
            var params = {id: vm.nowSelectRoleId, can_use_roleids: ids};
            rolesService.saveCanUseRoles(params)
                .then(function (response) {
                    AppTools.successTips("修改成功！");
                })
        }
        // 角色分配中选中的信息
        function getAllSelectCanUseRolesId() {
            return _.map(_.filter(vm.rolesCanUseList,function (item) {
                return item.selected;
            }),function (item) {
                return item.id;
            });
        }


       //  获取角色菜单
        function loadRolesMenuList(id) {
            vm.roleMenuAllChecked = false;
            var params = {roleId: id};
            rolesService.loadRolesMenusList(params)
                .then(setRolesMenuList)
        }

        function setRolesMenuList(response) {
            var result = response.data.rows;
            var zNodes = [];
            var setting = {
                check: {
                    enable: true,
                    chkboxType: {'Y':'','N':''}// 定义复选框选中不影响父节点及子节点
                },
                view: {
                    nameIsHTML: true
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: 'id',
                        pIdKey: 'parentid'
                    }
                },
                callback: {

                }
            };
            zNodes = _.map(result, zNodeFilter);
            vm.zParams = {
                setting: setting,
                zNodes: zNodes
            };
            function zNodeFilter(node) {
                node.isParent = node.state == 'open' ? false : true;
                node.checked = (node.checked == 'true' ? true : false);
                return node;
            }
        }

        // 菜单权限 保存
        function saveRoleMenus() {
            var checkedMenuIds = '';
            var menuZtree =$.fn.zTree.getZTreeObj("menuZtree");
            var selectNodes = menuZtree.getCheckedNodes(true);
            _.forEach(selectNodes,function (item) {
                checkedMenuIds += item.id + ',';
            });
            if (null != checkedMenuIds && '' != checkedMenuIds) {
                checkedMenuIds = checkedMenuIds.substring(0,checkedMenuIds.length - 1);
            }

            var params = {id: vm.nowSelectRoleId, permstring: checkedMenuIds};
            rolesService.saveRolesMenus(params)
                .then(function (response) {
                    AppTools.successTips("修改成功！");
                })
        }

        function roleMenuCheckAll() {// 全选、取消全选菜单
            var menuZtree =$.fn.zTree.getZTreeObj("menuZtree");
            if (vm.roleMenuAllChecked) {
                menuZtree.checkAllNodes(true);
            } else {
                menuZtree.checkAllNodes(false);
            }
        }


    }
})();