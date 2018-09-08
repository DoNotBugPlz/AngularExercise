/**
 * Created by chencl@1193 on 2018/8/23.
 */
(function () {
    'use strict';
    angular
        .module('app.monitoringIndexManage')
        .controller('MonitoringIndexManageCtrl', MonitoringIndexManageCtrl);
    MonitoringIndexManageCtrl.$inject = ['$scope', 'coreService', '$stateParams', 'monitoringIndexManageService', 'pageInfDefault', '$window','ngDialog', '_'];

    /* @ngInject */
    function MonitoringIndexManageCtrl($scope,coreService,$stateParams, monitoringIndexManageService, pageInfDefault,$window, ngDialog, _) {
        var vm = this;
        vm.title = 'DesktopCtrl';
        vm.searchIndex = searchIndex;
        vm.clearAll = clearAll;
        vm.addIndex = addIndex;
        vm.operateIndex = operateIndex;
        vm.updateIndex = updateIndex;
        vm.loadIndexList = loadIndexList;
        vm.setIndexList = setIndexList;
        vm.index_category_text = '';
        vm.cf_index_text = '';
        var refreshList = refreshList;
        var openIndex = openIndex;
        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };
        window.aa=   vm;
        activate();

        ////////////////
        function activate() {
            loadCategory().then(loadIndexList)
            loadDeptTree();
        }

        function loadCategory() {
            return coreService.getCategoryValues('INDEX_PROPERTIES,BENCHMARK_INDEX,DELATATUS')
                .then(setCategoryValues);
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.index_nature = coreService.covertCategoryValueIdToInt(result["INDEX_PROPERTIES"]);
            vm.index_category = coreService.covertCategoryValueIdToInt(result["BENCHMARK_INDEX"]);
            vm.delstatus = coreService.covertCategoryValueIdToInt(result["DELATATUS"]);
        }

        function loadDeptTree() {
            monitoringIndexManageService.loadIndexTree()
                .then(setDeptTree);
        }
        function setDeptTree(response) {
            var result = response.data.rows;
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../Cf_index/LoadPageListForConfig',
                    autoParam: ["id","refid"],
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
        }

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

        function chooseNode(e, treeId, treeNode){
            console.log(treeNode);
            var id = treeNode.id;
            var pId = treeNode.pId;
            var name = treeNode.name;
            if(id == '1445' && !pId){   //商品基准库
                vm.searchParams = {};
                vm.index_category_text = '';
                vm.cf_index_text = '';
            }else if(pId  == "1445"){   // 类别
                vm.searchParams = {};
                vm.searchParams.index_category = treeNode.refid;
                vm.index_category_text = '>>'+name;
                vm.cf_index_text = '';
            }else{
                var  index_category  = treeNode.index_category;
                vm.searchParams = {};
                vm.searchParams.id = treeNode.id;
                vm.index_category_text = '';
                _.forEach(vm.index_category,function (item,i) {
                    if(item.id ==index_category ){
                        vm.index_category_text = ">>"+item.chinaname;
                    }
                });
                vm.cf_index_text = '>>'+name;
            }
            refreshList();
        }

        function loadIndexList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            monitoringIndexManageService.loadIndexList(params)
                .then(function (response) {
                    setIndexList(response, params.pageNumber)
                });
        }

        function setIndexList(response, pageNum) {
            var result = response.data;
            vm.monitoringIndexList = result.rows;
            vm.monitoringIndexListPage = angular.extend({pageTurn: 'loadIndexList', pagenum: pageNum}, result);
        }

        //刷新列表
        function refreshList() {
            loadIndexList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }
        function searchIndex() {
            if(vm.searchParams && vm.searchParams.index_category){
                _.forEach(vm.index_category,function (item,i) {
                    if(item.id ==vm.searchParams.index_category ){
                        vm.index_category_text = ">>"+item.chinaname;
                    }
                })
            }else{
                vm.index_category_text = "";
            }
            vm.cf_index_text ="";

            loadIndexList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }
        function clearAll() {
           vm.searchParams = {}
        }

        function updateIndex(n){
            var param = n;
            if(n.delstatus == '0'){
                param.delstatus =  1;
            }else{
                param.delstatus = 0;
            }
            monitoringIndexManageService.updateIndex(param)
                .then(refreshList);
        }

        function addIndex() {
            openIndex("新增指标",{});
        }

        function operateIndex(item,flag){ //flag:0查看 1：编辑
            if(!flag){
                openIndex("查看指标",angular.extend(item,{disabled_flag:true}));
            }else{
                openIndex("编辑指标",angular.extend(item,{disabled_flag:false}));
            }
        }

        function openIndex(title,params){
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            ngDialog.open({
                title: title,
                template:"goodsReferenceLib/monitoringIndexManage/detail/index.detail.html",
                height:'550px',
                width:'800px',
                controller:'IndexDetailCtrl as vm',
                data:params,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './goodsReferenceLib/monitoringIndexManage/detail/index.detail.controller.js',
                            './goodsReferenceLib/monitoringIndexManage/detail/index.detail.service.js',
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    refreshList();
                }
            });
        }
    }

})();

