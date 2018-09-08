(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuCtrl', MenuCtrl);

    MenuCtrl.$inject = ['$state','$scope','menuService','_','coreService'];

    /* @ngInject */
    function MenuCtrl($state,$scope,menuService,_,coreService) {
        var vm = this;
        vm.addNewMenu = addNewMenu;
        vm.destoryMenuList = destoryMenuList;
        vm.deleteMenuList = deleteMenuList;
        vm.unDeleteMenuList = unDeleteMenuList;
        var loadMenuTree = loadMenuTree;

        function activate() {
            loadMenuTree() ;
        }
        function loadMenuTree() {
            menuService.loadMenuTree()
                .then(setMenuTree);
        }
        function setMenuTree(response) {
            var result = response.data.rows;
            //result=[{id:1,pid:0,name:"测试1"},{id:2,pid:0,name:"测试2"}];
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../Sys_menu/LoadPageList.do',
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
                edit:{
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false,
                    drag:{
                        isMove:true,
                        prev:true,
                        inner:true,
                        next:true,
                        autoExpandTrigger: true
                    }
                },
                callback: {
                    onClick: chooseNode,
                    onDrop: dropDrag
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
                node.name = node.name;
                if(node.delstatus){
                    node.icon="../project/lib/ztree/css/zTreeStyle/img/diy/del.png"
                }
                return node;
            }
        }

        function dropDrag(e,treeId, treeNodes, targetNode, moveType) {
            var node = treeNodes[0];
            var params = {
                    moveType:moveType,
                    tableName:"sys_menu",
                    idColName:"id",
                    idColType:"string",
                    parentIdColName:"parentid",
                    sortindexColName:"sortindex",
                    id:node.id,
                    targetId:targetNode.id
            };


            coreService.dataDragSort(params).then(
                function(){
                    AppTools.successTips("移动成功！")
                },
                function(){
                    AppTools.errorTips("移动失败！")
                }
            );
            /**
             * moveType 移动类型
             * id 主键 idType
             * targetnode 目标
             * sortindex 排序字段，parentid 父主键 字段
             */


        }
        
        function chooseNode(e, treeId, treeNode){
            var menuId = treeNode.id;

            $state.go('menuDetail', {menuId:menuId,zTreeRefreshMenuId:treeNode.parentid});
        }

        function addNewMenu(opType){
            var parentMenuId = "";
            var zTreeRefreshMenuId = "";
            if(opType==1){//新增下級
                var treeObj = $.fn.zTree.getZTreeObj("menuTree");
                var menuSelectList = treeObj.getCheckedNodes();
                if(menuSelectList!=null&&menuSelectList.length>0){
                    var menuParent = menuSelectList[0];
                    parentMenuId = menuParent.id;
                    if(menuParent.isParent){
                        zTreeRefreshMenuId = parentMenuId;
                    }
                }else{
                    AppTools.errorTips("请选择父菜单");
                    return;
                }
            }
            $state.go('menuDetail', {menuId:"",parentMenuId:parentMenuId,zTreeRefreshMenuId:zTreeRefreshMenuId,menuTimeStamp:new Date()});
            AppTools.successTips("当前处于新增状态!");
        }

        function destoryMenuList(){
            var menuIdList = loadSelectMenuIdList();
            var params = {ids:menuIdList.join(",")} ;
            menuService.destoryMenuList(params)
                .then(destoryMenuListSuccess);

        }
        function destoryMenuListSuccess(){
            AppTools.successTips("删除成功!");
            //var treeObj = $.fn.zTree.getZTreeObj("menuTree");
            //var treeObj = $.fn.zTree.getZTreeObj("menuTree");
            //treeObj.reAsyncChildNodes(null, "refresh");
            $scope.$broadcast("zTreeRefreshEvent");
        }

        function deleteMenuList(){
            var menuIdList = loadSelectMenuIdList();
            var params = {ids:menuIdList.join(",")} ;
            menuService.deleteMenuList(params)
                .then(deleteMenuListSuccess);
        }
        function deleteMenuListSuccess(){
            AppTools.successTips("禁用成功!");
            $scope.$broadcast("zTreeRefreshEvent");
        }

        function unDeleteMenuList(){
            var menuIdList = loadSelectMenuIdList();
            var params = {ids:menuIdList.join(",")} ;
            menuService.unDeleteMenuList(params)
                .then(unDeleteMenuListSuccess);
        }
        function unDeleteMenuListSuccess(){
            AppTools.successTips("启用成功!");
            $scope.$broadcast("zTreeRefreshEvent");
        }
        function loadSelectMenuIdList (){
            var treeObj = $.fn.zTree.getZTreeObj("menuTree");
            var menuSelectList = treeObj.getCheckedNodes();
            var menuIdList = [];
            _.forEach(menuSelectList,function (e) {
                menuIdList.push(e.id);
            });
            return menuIdList;
        }

        $scope.$on('menuZTreeRefreshEvent', function (event, id) {
          $scope.$broadcast("zTreeRefreshEvent",id);
        });
        activate();

    }
})();

