/**
 * Created by chencl on 2018/8/30
 * 待填报列表
 */
(function () {
    'use strict';

    angular
        .module('app.dataImport')
        .controller('DataImportCtrl', DataImportCtrl);
    DataImportCtrl.$inject = ['$scope','$stateParams','dataImportService','pageInfDefault','coreService','ngDialog','$window'];

    /* @ngInject */
    function DataImportCtrl($scope,$stateParams,dataImportService,pageInfDefault,coreService,ngDialog,$window) {
        var vm =this;
        vm.condition ={};
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        vm.clearAll = clearAll;
        vm.getList  = getList;
        vm.dataImport = dataImport;
        activate();
        bindImgClick()
        function activate() {
            vm.signList = [
                {id:'a1',chinaname:'菜籽油',site_name:"桶装一级压榨",col_datetime:'元/5升',actual_sign_nums:'51',monitor_point:'南小区农贸市场',is_pub:"1"},
                {id:'b2',chinaname:'萝卜',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'45',monitor_point:'羽山路大润发超市',is_pub:"1"},
                {id:'c3',chinaname:'菜茄子',site_name:"新鲜一级",col_datetime:'元/500克',actual_sign_nums:'39',monitor_point:'羽山路大润发超市',is_pub:"1"}
            ];

        }

        function getList(pageNumber,pageSize) {
            var pageInfo = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInfo,vm.condition);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInfo);
            return dataImportService.getList(params).then(setList);
        }
        function setList(response,pageNum) {
            var result = response.data;
            vm.signList = result.rows;
            vm.signListPage = angular.extend({pageTurn: 'getList',pagenum:pageNum}, result);
        }
        function clearAll() {
            vm.condition = {}
        }

        function dataImport(title,param){
            var height = $window.innerHeight+100;
            var width = $window.innerWidth;
            ngDialog.open({
                title: "数据导入",
                template:"./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/dataImport/importDetail/import.detail.html",
                height:'740px',
                width:'800px',
                controller:'ImportDetailCtrl as vm',
                data:param,
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/dataImport/importDetail/import.detail.controller.js",
                            "./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/dataImport/importDetail/import.detail.service.js",
                            './utils/app.checkboxSel.js',
                            'chosen'
                        ]);
                    }
                },
                preCloseCallback:function () {
                    // refreshList();
                }
            });
        }

        /**demo图片点击放大事件**/
        function bindImgClick() {
            $(document).off("click",".table_main_zzy u");
            $(document).on("click",".table_main_zzy u",function () {
                vm.img_arr = [];
                var new_param = {};
                var random = Math.random();
                new_param.pkid = random;
                new_param.file_name = "11111";
                new_param.download_path = 'http://localhost:8089/wjjc_ythpt/styles/images/green/loginBgT.jpg';
                var new_param2 = {};
                var random2 = Math.random();
                new_param2.pkid = random2;
                new_param2.file_name = "2222";
                new_param2.download_path = 'http://localhost:8089/wjjc_ythpt/styles/images/green/loginBgT.jpg';
                vm.img_arr.push(new_param);
                vm.img_arr.push(new_param2);
                $scope.img_arr = JSON.stringify(vm.img_arr);
                $scope.current_pkid = random;

                var height = $window.innerHeight;
                var width = $window.innerWidth;
                ngDialog.open({
                    title: "查看",
                    template:"./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/dataImport/picShow/pic.show.html",
                    height:'550px',
                    width:'800px',
                    controller:'PicShowCtrl as vm',
                    data:{},
                    scope:$scope,
                    resolve: {
                        loadChangePwdFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/dataImport/picShow/pic.show.controller.js",
                                "./priceMonitorManage/currencyGoods/monitorDataCollection/monitorCenter/dataImport/picShow/pic.show.service.js",
                                'chosen'
                            ]);
                        }
                    },
                    preCloseCallback:function () {
                        // refreshList();
                    }
                });
            })

        }

    }
})();

