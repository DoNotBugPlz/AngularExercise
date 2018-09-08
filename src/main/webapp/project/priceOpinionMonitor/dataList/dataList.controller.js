/**
 * Created by chencl on 2018/8/30
 * 待填报列表
 */
(function () {
    'use strict';

    angular
        .module('app.dataList')
        .controller('DataListCtrl', DataListCtrl);
    DataListCtrl.$inject = ['$scope','$stateParams','dataListService','pageInfDefault','coreService','ngDialog'];

    /* @ngInject */
    function DataListCtrl($scope,$stateParams,dataListService,pageInfDefault,coreService,ngDialog) {
        var vm =this;
        vm.condition ={};
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        vm.clearAll = clearAll;
        vm.getList  = getList;
        vm.openDialog  = openDialog;
        
        activate();
        function activate() {
           // getList()
            vm.signList = [{chinaname:'关于猪肉价格上涨',site_name:"关于猪肉价格上涨的原因为近期饲料价格的上涨",col_datetime:'新华社',actual_sign_nums:'微博',is_pub_text:"2018-4-18 09:00-17:00",is_pub:"1"},
                {chinaname:'食用油的安全问题',site_name:"近期有关部门爆出个别超市的食用油",col_datetime:'南京市食品监测局',actual_sign_nums:'微信',is_pub_text:"2018-5-18 09:00-17:00",is_pub:"0"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:2,
                rows:[{chinaname:'关于猪肉价格上涨',site_name:"关于猪肉价格上涨的原因为近期饲料价格的上涨",col_datetime:'新华社',actual_sign_nums:'微博',is_pub_text:"2018-4-18 09:00-17:00",is_pub:"1"},
                    {chinaname:'食用油的安全问题',site_name:"近期有关部门爆出个别超市的食用油",col_datetime:'南京市食品监测局',actual_sign_nums:'微信',is_pub_text:"2018-5-18 09:00-17:00",is_pub:"0"}
                ]
        }
        }

        function getList(pageNumber,pageSize) {
            var pageInfo = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInfo,vm.condition);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInfo);
            return dataListService.getList(params).then(setList);
        }
        function setList(response,pageNum) {
            var result = response.data;
            vm.signList = result.rows;
            vm.signListPage = angular.extend({pageTurn: 'getList',pagenum:pageNum}, result);
        }
        function clearAll() {
            vm.condition = {}
        }

        function openDialog(n) {
            showView('',n)
        }
        function showView(title,param){
            ngDialog.open({
                title: title,
                template:"./priceOpinionMonitor/dataList/showView/show.view.html",
                height:'450px',
                width:'800px',
                controller:'ShowViewCtrl as vm',
                data:param,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "./priceOpinionMonitor/dataList/showView/show.view.controller.js",
                            "./priceOpinionMonitor/dataList/showView/show.view.service.js",
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    // refreshList();
                }
            });
        }

    }
})();

