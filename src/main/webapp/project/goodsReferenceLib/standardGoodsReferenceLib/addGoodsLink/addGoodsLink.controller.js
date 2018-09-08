(function () {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .controller('AddGoodsLinkCtrl', AddGoodsLinkCtrl);

    AddGoodsLinkCtrl.$inject = ['$scope','$stateParams','pageInfDefault','addGoodsLinkService','coreService','$q','ngDialog'];

    /* @ngInject */
    function AddGoodsLinkCtrl($scope,$stateParams,pageInfDefault,addGoodsLinkService,coreService,$q,ngDialog) {
        var vm =this;
        vm.name = $scope.ngDialogData.name;
        vm.goodsfamilyid = $scope.ngDialogData.goodsfamilyid;
        vm.chooseGoods = chooseGoods;
        vm.chooseGoodsRight = chooseGoodsRight;
        vm.saveGoodsLinkDetail = saveGoodsLinkDetail;
        activate();
        function activate() {
            setGoodsTree();
            setGoodsTreeRight();
            loadGoodsList();
            loadGoodsListRight();
        }

        function loadGoodsList(pageNumber,pageSize) {
            var params = {};
            params.id=vm.goods_type_id;
            addGoodsLinkService.loadGoodsList(params)
                .then(function (resp) {
                    setGoodsList(resp)
                });


        }
        function loadGoodsListRight(pageNumber,pageSize) {
            var params = {};
            params.id=vm.goods_type_id;
            addGoodsLinkService.loadGoodsList(params)
                .then(function (resp) {
                    setGoodsListRight(resp)
                });


        }
        function setGoodsList(response) {
            var result = response.data;
            vm.goodsList = result.rows;

        }
        function setGoodsListRight(response) {
            var result = response.data;
            vm.goodsListRight = result.rows;

        }

        function setGoodsTree() {
            //var result=response.data;
            var result = [{id:0,name:vm.name,goodsfamilyid:vm.goodsfamilyid}];
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
            vm.zParams1 = {
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
        function setGoodsTreeRight() {
            //var result=response.data;
            var result = [{id:0,name:vm.name,goodsfamilyid:vm.goodsfamilyid}];
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
                    onClick: chooseNodeRight
                }
            };
            zNodes = _.map(result, zNodeFilter);

            vm.zParams2 = {
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

        function chooseNode(e, treeId, treeNode){
            vm.goods_type_id = treeNode.id;
            loadGoodsList();
        }
        function chooseNodeRight(e, treeId, treeNode){
            vm.goods_type_id = treeNode.id;
            loadGoodsListRight();
        }
        
        
        function chooseGoods(n) {
            vm.goodsid = n.id;
            vm.goodsName = n.name;
        }
        
        function chooseGoodsRight(n) {
            vm.goodsidRight = n.id;
            vm.goodsNameRight = n.name;
        }
        
        function saveGoodsLinkDetail() {
            if(vm.goodsid!=undefined && vm.goodsidRight!=undefined){
                if(vm.goodsid != vm.goodsidRight){
                    var params = {};
                    params.cf_goods_link = {goods_id:vm.goodsid,link_goods_id:vm.goodsidRight,delstatus:0};
                    addGoodsLinkService.saveGoodsLinkDetail(params)
                        .then(function (resp) {
                            if(resp.data.id!=undefined){
                                AppTools.successTips("保存成功！");
                                cancelOp();
                            }
                        })
                }else{
                    AppTools.errorTips("关联商品与被关联商品不能是同一商品");
                }

            }else {
                AppTools.errorTips("请确认关联商品与被关联商品都已选中");
            }

        }
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }




    }
})();

