
(function () {
    'use strict';
    angular
        .module('app.monitorTaskManage')
        .controller('AddMonitorGoodsController', AddMonitorGoodsController);
    AddMonitorGoodsController.$inject = ['$scope', 'coreService','addMonitorGoodsService','pageInfDefault', 'ngDialog', '_','$state'];

    /* @ngInject */
    function AddMonitorGoodsController($scope, coreService,addMonitorGoodsService,pageInfDefault, ngDialog, _,$state) {
        var vm = this;
        window.a = vm;
        vm.choosedGoods = [];
        vm.searchParams = {};
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:5
        };
        vm.search = search;
        vm.saveInfo = saveInfo;
        vm.cancelOp = cancelOp;
        vm.loadGoodsListForMonitor = loadGoodsListForMonitor;

        vm.reduceMyself = reduceMyself;




        activate();
        function activate() {
            coreService.getCategoryValues('GOODS_FAMILY,LEVELTYPE2,TASKCYCLE,TASKSTATUS,TASKCLASSES')
                .then(setCategoryValues);
        }
        function setCategoryValues(response) {
            var result = response.data;
            vm.goods_family= coreService.covertCategoryValueIdToInt(result["GOODS_FAMILY"]);
            vm.task_level= coreService.covertCategoryValueIdToInt(result["LEVELTYPE2"]);
            vm.task_cycle= coreService.covertCategoryValueIdToInt(result["TASKCYCLE"]);
            vm.task_status= coreService.covertCategoryValueIdToInt(result["TASKSTATUS"]);
            vm.task_classes= coreService.covertCategoryValueIdToInt(result["TASKCLASSES"]);

        }

        function loadGoodsListForMonitor(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            params.id=vm.goods_type_id;
            addMonitorGoodsService.loadGoodsListForMonitor(params)
                .then(function (resp) {
                    setGoodsList(resp,params.pageNumber)
                });
        }
        function setGoodsList(response,pageNum) {
            var result = response.data;
            vm.allSelected = false;
            vm.goodsList = result.rows;
            _.map(vm.goodsList,function (item) {
                _.map(vm.choosedGoods,function (n) {
                    if(item.id === n.id){
                        item.selected = true;
                    }
                })
            });

            vm.goodsListPage = angular.extend({pageTurn: 'loadGoodsListForMonitor',pagenum:pageNum,pagesize:5}, result);
        }

        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        function selectAll() {
            vm.allSelected=!vm.allSelected;
            if(!angular.isUndefined(vm.goodsList)){
                _.forEach(vm.goodsList,function (item) {
                    item.selected=vm.allSelected;
                    if(item.selected){
                        var p = false;
                        _.map(vm.choosedGoods,function (n) {
                            if(n.id === item.id){
                                p = true;
                            }
                        });
                        if(p){
                        }else {
                            vm.choosedGoods.push(item);
                        }
                    }else {
                        vm.choosedGoods = _.remove(vm.choosedGoods,function (n) {
                            return n.id != item.id;
                        });
                    }
                })
            }
        }
        function selectItem(item) {
            item.selected=!item.selected;
            if(item.selected){
                vm.choosedGoods.push(item);
            }else {
                vm.choosedGoods = _.remove(vm.choosedGoods,function (n) {
                    return n.id != item.id;
                });
            }

        }
        function getAllSelectId(dataList) {
            return _.map(_.filter(dataList,function (item) {
                return item.selected;
            }),function (item) {
                return item.id;
            });
        }
        /***批量选择控制**/

        function reduceMyself(item) {
            item.selected=!item.selected;
            vm.choosedGoods = _.remove(vm.choosedGoods,function (n) {
                return n.id != item.id;
            });

        }
        function search() {
            console.log(vm.searchParams);
            loadGoodsListForMonitor();
        }
        function saveInfo() {
            ngDialog.close($scope.ngDialogId,vm.choosedGoods);
        }
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }





    }


})();

