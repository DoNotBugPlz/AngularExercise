/**
 * Created by tr on 2018年8月22日10:48:54
 */
(function () {
    'use strict';   // js 编写标准化
    angular
        .module('app.mp')
        .controller('MpCtrl', MpCtrl); // 创建ctrl
    MpCtrl.$inject = [
        '$state',
        '$scope',
        'ngDialog',
        '_',
        'mpService',
        'pageInfDefault',
        '$window',
    ];
    function MpCtrl($state,$scope,ngDialog,_,mpService,pageInfDefault,$window) {
        var vm = this;
        var dept_ext_id = '';
        /** 获取部门树 */
        function loadDeptTree() {
            mpService.loadDeptTree()
                .then(setDeptTree);
        }
        /** 设置部门树 */
        function setDeptTree(response) {
            var result = response.data.rows;
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../Cf_dept_ext/LoadDeptInfoList.do',
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
                if (!childNodes){
                    return null;
                }else{
                    return _.map(childNodes.rows, zNodeFilter);
                }
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

            dept_ext_id = treeNode.dept_ext_id
            vm.searchParams = {"dept_ext_id":dept_ext_id};
            loadCmsList();


        }
        /*-----------------------------------------------------------以上代码监测机构树形菜单----------------------------------------------------------------*/

        vm.loadCmsList = loadCmsList;
        vm.addInfo = addInfo;
        vm.edtInfo = edtInfo;
        
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };

        function loadCmsList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            mpService.loadCmsList(params)
                .then(function(response){
                    setCmsList(response,params.pageNumber)
                });
        }
        
        function setCmsList(response,pageNum) {
            var result = response.data;
            vm.cmsList = result.rows;
            vm.cmsListPage = angular.extend({pageTurn: 'cmsList',pagenum:pageNum}, result);
        }

        function addInfo() {
            openWind("新增监测机构",{});
        }
        function edtInfo(obj) {
            openWind("修改监测机构",obj);
        }

        function openWind(title,params) {
            ngDialog.open({
                title: title,
                template:"./organization/monitorPoint/detail/monitorPoint_detail.html",
                height:'700px',
                width:'950px',
                controller:'MpDetailCtrl as vm',
                data:{editInfo:params},
                resolve: {
                    loadMpFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './organization/monitorPoint/detail/monitorPoint_detail.controller.js',
                            './organization/monitorPoint/detail/monitorPoint_detail.service.js',
                            './utils/app.checkboxSel.js',
                            'My97DatePicker',
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    refreshList();
                }
            });
        }




        /*-----------------------------------------------------------以上代码列表查询-------------------------------------------------------------------------*/

        function activate() {
            loadDeptTree();
        }
        activate();

    }
})();