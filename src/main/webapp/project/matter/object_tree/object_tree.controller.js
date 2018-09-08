
(function () {
    'use strict';
    angular
        .module('app.goodsReferenceLib')
        .controller('GoodsReferenceLibCtrl', GoodsReferenceLibCtrl);
    GoodsReferenceLibCtrl.$inject = ['$scope', 'coreService', 'goodsReferenceLibService', 'pageInfDefault', 'ngDialog', '_','$state'];

    /* @ngInject */
    function GoodsReferenceLibCtrl($scope, coreService, goodsReferenceLibService, pageInfDefault, ngDialog, _,$state) {
        var vm = this;
        window.a = vm;
        window.b = $scope;
        vm.goods_type_id = -1;
        var goods_type_name ='';
        vm.searchParams = {};
        $scope.addtypename = '';

        vm.loadGoodsList = loadGoodsList;
        vm.changeStatue = changeStatue;
        vm.addGoods = addGoods;
        vm.editGoods = editGoods;
        vm.viewGoods = viewGoods;
        vm.searchGoods = searchGoods;
        vm.goodsLink = goodsLink;
        vm.addGoodsType = addGoodsType;
        vm.reduceGoodsType = reduceGoodsType;
        vm.super_sel = super_sel;
        vm.reset = reset;
        vm.advSearchFun = advSearchFun;
        vm.advSearch = false;
        $scope.saveSelectOp = saveSelectOp;
        $scope.cancelOp = cancelOp;
        function advSearchFun(){
            vm.advSearch=!vm.advSearch;
        }

        
        function  saveSelectOp() {
            vm.goodsLis={};
            vm.goodsLis = _.map(vm.goodsList,function (item) {
                if(item.selected){
                    return item;
                }
            });
           ngDialog.close($scope.ngDialogId, vm.goodsLis);
        }


        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }
        
        
        var setGoodsList = setGoodsList;
        var refreshList = refreshList;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };

        var loadGoodsTree = loadGoodsTree;
        activate();
        function activate() {
            coreService.getCategoryValues('GOODS_FAMILY,YESNO')
                .then(setCategoryValues)
                .then(function () {
                    //loadGoodsTree().then(setGoodsTree);
                    setGoodsTree();
                    loadGoodsList();
                    loadBeloneCategory();
                })



        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.goods_family= coreService.covertCategoryValueIdToInt(result["GOODS_FAMILY"]);
            vm.yesnoCatagory= coreService.covertCategoryValueIdToInt(result["YESNO"]);
            vm.goods_familyValue = vm.goods_family[0].id;
            vm.goods_familyName = vm.goods_family[0].chinaname;

        }
        function loadGoodsTree() {
            var params = {id:vm.goods_familyValue};
            return goodsReferenceLibService.loadGoodsTreeRootNode(params);
        }
        function setGoodsTree(response) {
            //var result=response.data;
            var result = [{id:0,name:vm.goods_familyName,goodsfamilyid:vm.goods_familyValue}];
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../Cf_goods/loadGoodsTree.do',
                    autoParam: ["id","goodsfamilyid"],
                    contentType: "application/json",
                    type: 'GET',
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
                return _.map(childNodes, zNodeFilter);
            }
            function zNodeFilter(node) {
                node.checked = false;
                node.isParent = node.state=='open'?false:true;
                node.name = node.name;
                node.name = node.name;
                if(node.delstatus){
                    node.icon="../project/lib/ztree/css/zTreeStyle/img/diy/del.png"
                }
                return node;
            }
        }



        function addGoods() {
            if(vm.goods_type_id!=-1){
                opDemo("新增商品",{"goods_type_id":vm.goods_type_id,"goods_type_name":goods_type_name,"type":"add"});
            }else {
                AppTools.errorTips("请先选择商品类型");
            }

        }
        function editGoods(obj) {
            opDemo("修改商品",{"goodsid":obj.id,"type":"edit"});
        }
        function viewGoods(obj) {
            opDemo("商品详情",{"goodsid":obj.id,"type":"view"});
        }

        function opDemo(title,params) {
            if(vm.goods_familyValue===1){
                ngDialog.open({
                    title: title,
                    template:"goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLibForStandard.detail.html",
                    height:'550px',
                    width:'800px',
                    // height:height*0.9+'px',
                    // width:width*0.9+'px',
                    controller:'GoodsReferenceLibDetailCtrl as vm',
                    data:params,
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLib.detail.controller.js',
                                './goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLib.detail.service.js',
                                'My97DatePicker'
                            ]);
                        }
                    },
                    preCloseCallback:function () {
                        refreshList();
                    }
                });
            }else if(vm.goods_familyValue===2){
                ngDialog.open({
                    title: title,
                    template:"goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLibForDrug.detail.html",
                    height:'550px',
                    width:'800px',
                    // height:height*0.9+'px',
                    // width:width*0.9+'px',
                    controller:'GoodsReferenceLibDetailCtrl as vm',
                    data:params,
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLib.detail.controller.js',
                                './goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLib.detail.service.js',
                                'My97DatePicker'
                            ]);
                        }
                    },
                    preCloseCallback:function () {
                        refreshList();
                    }
                });
            }else if(vm.goods_familyValue===3){
                ngDialog.open({
                    title: title,
                    template:"goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLibForIndustry.detail.html",
                    height:'550px',
                    width:'800px',
                    // height:height*0.9+'px',
                    // width:width*0.9+'px',
                    controller:'GoodsReferenceLibDetailCtrl as vm',
                    data:params,
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLib.detail.controller.js',
                                './goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLib.detail.service.js',
                                'My97DatePicker'
                            ]);
                        }
                    },
                    preCloseCallback:function () {
                        refreshList();
                    }
                });
            }else if(vm.goods_familyValue===4){
                ngDialog.open({
                    title: title,
                    template:"goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLibForIndex.detail.html",
                    height:'550px',
                    width:'800px',
                    // height:height*0.9+'px',
                    // width:width*0.9+'px',
                    controller:'GoodsReferenceLibDetailCtrl as vm',
                    data:params,
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLib.detail.controller.js',
                                './goodsReferenceLib/standardGoodsReferenceLib/detail/goodsReferenceLib.detail.service.js',
                                'My97DatePicker'
                            ]);
                        }
                    },
                    preCloseCallback:function () {
                        refreshList();
                    }
                });
            }

        }

        function goodsLink(params) {
            ngDialog.open({
                title: '商品关联管理',
                template:"goodsReferenceLib/standardGoodsReferenceLib/goodsLink/goodsLink.html",
                height:'650px',
                width:'1200px',
                // height:height*0.9+'px',
                // width:width*0.9+'px',
                controller:'GoodsLinkCtrl as vm',
                data:params,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './goodsReferenceLib/standardGoodsReferenceLib/goodsLink/goodsLink.controller.js',
                            './goodsReferenceLib/standardGoodsReferenceLib/goodsLink/goodsLink.service.js',
                            'My97DatePicker'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    refreshList();
                }
            });
        }

        function loadGoodsList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            params.id=vm.goods_type_id;
            if(!angular.isUndefined(vm.goods_type_id)&&vm.goods_type_id!='null'&&vm.goods_type_id!=''){
                goodsReferenceLibService.loadGoodsList(params)
                    .then(function (resp) {
                        setGoodsList(resp,params.pageNumber)
                    });
            }else{
                vm.goodsList = {};
           }

        }
        function setGoodsList(response,pageNum) {
            var result = response.data;
            vm.goodsList = result.rows;
            vm.goodsListPage = angular.extend({pageTurn: 'loadGoodsList',pagenum:pageNum}, result);
        }

        function searchGoods() {
            loadGoodsList();
        }
        function changeStatue(id,value) {
            var params = {id:id,delstatue:value};
            goodsReferenceLibService.changeStatue(params)
                .then(function (resp) {
                    refreshList();
                });

        }
        function loadBeloneCategory() {
            var params = {id:vm.goods_type_id};
            if(!angular.isUndefined(vm.goods_type_id)&&vm.goods_type_id!='null'&&vm.goods_type_id!=''){
                goodsReferenceLibService.loadBeloneCategory(params)
                    .then(setBeloneCategory);
            }else{
                vm.beloneCategory = '';
            }

        }
        //刷新列表
        function refreshList() {
            loadGoodsList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        function setBeloneCategory(response) {
            if(response.data.length===2){
                vm.beloneCategory = '';
            }else {
                vm.beloneCategory = response.data;
                while(vm.beloneCategory.indexOf('\"')>-1){
                    vm.beloneCategory = vm.beloneCategory.replace('\"','');
                }
            }

        }
        function addGoodsType() {
            var params = {parentid:vm.goods_type_id,goods_family:vm.goods_familyValue}
            if(vm.goods_type_id!=-1){
                ngDialog.open({
                    title:'',
                    template:'goodsReferenceLib/standardGoodsReferenceLib/addGoodsType/addGoodsType.html',
                    height:'160px',
                    width:'243px',
                    controller:'AddGoodsTypeCtrl as vm',
                    data:params,
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './goodsReferenceLib/standardGoodsReferenceLib/addGoodsType/addGoodsType.controller.js',
                                './goodsReferenceLib/standardGoodsReferenceLib/addGoodsType/addGoodsType.service.js',
                                'My97DatePicker'
                            ]);
                        }
                    },
                    preCloseCallback:function () {
                        setGoodsTree();
                        //loadGoodsTree().then(setGoodsTree);
                    }
                });

            }else {
                AppTools.errorTips("请先选择商品类型");
            }
        }
        function reduceGoodsType() {
            var params = {goodsTypeId:vm.goods_type_id};
            if(vm.goods_type_id!=-1){
                goodsReferenceLibService.removeGoodsType(params)
                    .then(function (resp) {
                        if(resp.data.message==='0'){
                            AppTools.errorTips('商品类型正在使用，无法删除');
                        }else {
                            AppTools.successTips('删除成功');
                            //loadGoodsTree().then(setGoodsTree);
                            setGoodsTree();
                        }
                    })
            }else {
                AppTools.errorTips("请先选择商品类型");
            }

        }


        function chooseNode(e, treeId, treeNode){
            vm.goods_type_id = treeNode.id;
            goods_type_name = treeNode.name;
            loadGoodsList();
            loadBeloneCategory();

        }

        $scope.$watch('vm.goods_familyValue', function (newValue,oldValue) {
            if(newValue!=undefined){
                vm.goodsList={};
                vm.beloneCategory='';
                vm.goods_type_id = -1;
                vm.searchParams = {};
                vm.goods_familyName = vm.goods_family[newValue-1].chinaname;
                setGoodsTree();
            }

        });

        //高级检索
        function super_sel() {
            if (!$(this).hasClass("up")) {
                $(this).addClass("up");
                $(".leftSel_zzy2").removeClass("over_hide");
            } else {
                $(this).removeClass("up");
                $(".leftSel_zzy2").addClass("over_hide");
            }

        }

        function reset() {
            vm.searchParams = {};
        }





    }


})();

