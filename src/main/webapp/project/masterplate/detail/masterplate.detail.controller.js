(function () {
    'use strict';

    angular
        .module('app.masterplate')
        .controller('masterplateDetailCtrl', masterplateDetailCtrl);

    masterplateDetailCtrl.$inject = ['$scope', '$stateParams', 'ngDialog', 'coreService', 'masterplateDetailService'];

    /* @ngInject */
    function masterplateDetailCtrl($scope, $stateParams, ngDialog, coreService, masterplateDetailService) {
        var vm = this;
        vm.masterplateId = $stateParams.id;
        //加载模版详细信息
        var loadMasterplateInfo = loadMasterplateInfo;
        //保存模版基本信息
        vm.saveMasterplateBase = saveMasterplateBase;
        //添加品类
        vm.classList = [];
        vm.addClass = addClass;
        vm.saveClass = saveClass;
        //删除品类
        vm.delClass = delClass;

        vm.closePop = closePop;

        //添加品种
        vm.goodsList = [];
        vm.addMasterplateGoods = addMasterplateGoods;


        activate();

        ////////////////
        function activate() {
            //加载字典项
            coreService.getCategoryValues('MASTERPLATETYPE')
                .then(setCategoryValues)
                .then(function () {
                    if (!angular.isUndefined(vm.masterplateId)) {
                        loadMasterplateInfo(vm.masterplateId);
                    }
                });
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.masterplatetypeCatagory = coreService.covertCategoryValueIdToInt(result["MASTERPLATETYPE"]);
        }

        //加载详细信息
        function loadMasterplateInfo(masterplateId) {
            var params = {id: masterplateId};
            masterplateDetailService.loadMasterplateInfo(params)
                .then(setMasterplateInfo);
        }

        function setMasterplateInfo(response) {
            if (response.data) {
                vm.masterplate = response.data.t_masterplate;
                vm.classList = response.data.t_class.rows;
            }
        }

        //添加品类信息
        function addClass() {
            if (vm.masterplate_id) {
                vm.class_name = "";
                $(".popupBg").show();
            } else {
                //第一次点击 添加 按钮时 先保存模版基本信息
                if ($scope.masterplate_form.$valid) {
                    masterplateDetailService.saveMasterplateBase(vm.masterplate)
                        .then(addClassInfo)
                } else {
                    AppTools.errorTips("请确保信息填写完整无误！")
                }
            }
        }

        //弹出品类信息窗
        function addClassInfo(response) {
            vm.masterplate = response.data;
            vm.masterplate_id = response.data.id;
            $(".popupBg").show();
        }

        //保存品类信息
        function saveClass(n) {
            if (vm.class_name) {
                var params = {"id": "", "class_name": vm.class_name, "masterplate_id": vm.masterplate_id};
                masterplateDetailService.saveClassInfo(params)
                    .then(showInfo)
            } else {
                AppTools.errorTips("请输入品类名称！")
            }
        }

        //关闭品类信息弹窗，展示已存信息
        function showInfo(response) {
            vm.class = response.data;
            vm.masterplate_class_id = response.data.id;
            $(".popupBg").hide();

            vm.classList.push({
                "id": vm.class.id,
                "class_name": vm.class.class_name,
                "masterplate_id": vm.class.masterplate_id,
                "goodsList": []
            });
        }

        function delClass(n) {
            AppTools.confirm("确定删除该品类吗？", function () {
                var params = {"id": n.id};
                masterplateDetailService.delClass(params).then(function () {
                    loadMasterplateInfo(vm.masterplateId);
                    AppTools.successTips("删除成功！");
                });
            });
        }

        //
        // function addGoodsInfo(response) {
        //     vm.class = response.data;
        //     vm.masterplate_class_id = response.data.id;
        //
        // }


        function closePop() {
            $(".popupBg").hide();
        }

        //添加品种
        function addMasterplateGoods(n) {
            opMasterplateGoods("添加品种", {"masterplate_class_id": n.id});
            // n.goodsList.push({
            //     "id": "",
            //     "goods_name": "大米",
            //     "spec": "一级",
            //     "measurement_unit": "元/500克",
            //     "price": "零售价",
            //     "table_name": "江苏省成品粮零售价格监测表"
            // });
        }

        //打开品种弹窗页
        function opMasterplateGoods(title, params) {
            ngDialog.open({
                title: title,
                template: "masterplate/addGoods/addGoods.html",
                height: '600px',
                width: '800px',
                controller: 'addGoodsCtrl as vm',
                data: params,
                resolve: {
                    loadMaterialDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './masterplate/addGoods/addGoods.controller.js',
                            './masterplate/addGoods/addGoods.service.js',
                            'ng-zTree',
                            'chosen',
                            'mCustomScrollbar'
                        ]);
                    }
                },
                preCloseCallback: function () {
                }
            });
        }

        //保存模版基本信息
        function saveMasterplateBase() {
            if ($scope.masterplate_form.$valid) {
                masterplateDetailService.saveMasterplateBase(vm.masterplate)
                    .then(saveMasterplateBaseSuccess)
            } else {
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }

        function saveMasterplateBaseSuccess(response) {
            vm.masterplate = response.data;
            addClass(vm.masterplate.id);
            AppTools.successTips("保存成功！");
        }


    }
})();

