(function () {
    'use strict';

    angular
        .module('app.matter')
        .controller('matterDetailCtrl', matterDetailCtrl);

    matterDetailCtrl.$inject = ['localStorageService', '$scope', 'matterdetailservice', 'ngDialog', 'coreService'];

    /* @ngInject */
    function matterDetailCtrl(localStorageService, $scope, matterdetailservice, ngDialog, coreService) {
        var vm = this;
        window.a = vm;
        var matter_id = $scope.ngDialogData.matter_id;
        vm.is_view = $scope.ngDialogData.is_view;
        vm.cancelOp = cancelOp;
        var loadMatter = loadMatter;
        var setMatter = setMatter;
        vm.saveMatter = saveMatter;
        vm.cancelOp = cancelOp;
        vm.openObjectTree = openObjectTree;

        vm.pzjc = pzjc;
        vm.blcl = blcl;
        vm.delematter = delematter;
        vm.delematerial = delematerial;
        //监测品种
        vm.goodsLis = [];
        function pzjc() {
            vm.goodsLis.push({good_id:'',price_trend_id:'',orginal_price:'',cunrrent_price:'',change_reaon:'',price_readjust:''});

        }

        function delematter(obj){
            _.remove(vm.goodsLis,obj);
        }
        //办理材料目录
        vm.material=[];
        function blcl() {
            vm.material.push({name:'',channel:'',papery:'',is_necessity:''});
        }

       function delematerial(obj){
           _.remove(vm.material,obj);

       }

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }




        function setMatter(response) {
            vm.matter =response.data.matter;
            vm.matter_monitor = response.data.matter_monitors[0];
            for( var i=0;i<response.data.monitor_greats.length;i++){
                var orginal_price = response.data.monitor_greats[i].orginal_price;
                var cunrrent_price = response.data.monitor_greats[i].cunrrent_price;
                var change_reaon  = response.data.monitor_greats[i].change_reaon;
                var price_readjust= response.data.monitor_greats[i].price_readjust;
                var name = response.data.monitor_greats[i].name;
                var good_id = response.data.monitor_greats[i].good_id;
                var measurement_unit = response.data.monitor_greats[i].measurement_unit;
                var spec = response.data.monitor_greats[i].spec;
                vm.goodsLis.push({name:name,good_id:good_id,guige:spec,unit:measurement_unit,price_trend_id:'',orginal_price:orginal_price,cunrrent_price:cunrrent_price,change_reaon:change_reaon,price_readjust:price_readjust});
            }

            // for( var i=0;i<response.data.material.length;i++){
            //    vm.material.push({name: response.data.material[i].name,channel:response.data.material[i].channel,
            //                      papery:response.data.material[i].papery,is_necessity:response.data.material[i].is_necessity});
            // }

        }

        function saveMatter () {
            var params = {};
            params["t_matter"] = vm. matter;
            params["t_matter_monitor"] = vm.matter_monitor;
            params["list"] = vm.goodsLis;
            params["materialist"] = vm.material;

            matterdetailservice.saveMatter(params)
                .then(saveSmsSuccess)
        }

        function saveSmsSuccess(response) {
            vm.question = response.data;
            AppTools.successTips("保存成功！");
            cancelOp();

        }

        function openObjectTree(title, params) {

            if (vm.is_view) {
                return;
            }
            title = '选择发送人';
            if (!params) {
                params = {};
            }
            if (vm.notice && vm.notice.notice_object) {
                params.notice_object = vm.notice.notice_object;
            } else {
                params.notice_object = "";
            }
            ngDialog.open({
                title: title,
                template: "matter/object_tree/object_tree.html",
                height: '600px',
                width: '320px',
                controller: 'GoodsReferenceLibCtrl as vm',
                data: params,
                resolve: {
                    loadObjectTreeFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './matter/object_tree/object_tree.controller.js',
                            './matter/object_tree/object_tree.service.js',
                            'ng-zTree'
                        ]);
                    }
                },
                preCloseCallback: backUsers
            });
        }

        function backUsers(value) {
            console.log(value);
            if (!value) {
                return;
            }
            var user_ids, user_names,mobile;
            /* 获取返回结果 */
            angular.forEach(value, function (data, index, array) {

                if (data.isParent != true || data.isParent == 'f') {
                    if (!user_ids) {
                        user_ids = data.id;
                    } else {
                        user_ids += ',' + data.id;
                    }
                    if(!mobile){
                        mobile = data.mobile;
                    }else{
                        mobile += ',' + data.mobile;
                    }
                    if (!user_names) {
                        user_names = data.name;
                    } else {
                        user_names += ',' + data.name;
                    }
                }
            });

            if (vm.t_sms_object) {
                //   notice_object

                $("#username").val(user_names);
                vm.t_sms_object.reciver_id = user_names;
                vm.t_sms_object.reciver_id = user_ids;
            } else {
                $("#username").val(user_names);
                vm.t_sms_object = {"reciver_id": user_names};
                vm.t_sms_object.reciver_id = user_ids;
            }
            vm.reciver_id = user_ids;
            console.log("mobile=" + mobile);
            console.log("reciver_id=" + user_ids);
            console.log("user_names=" + user_names);
        }
        activate();
        function activate() {
            loadMatter();
            coreService.getCategoryValues('ENTERPRISE_TYPE')
                .then(setCategoryValues);

            coreService.getCategoryValues('YESNO')
                .then(setCategoryValue);

        }


        function setCategoryValues(response){
            var result = response.data;
            vm.clattachstatusCatagory = coreService.covertCategoryValueIdToInt(result["ENTERPRISE_TYPE"]);
        }

        function  setCategoryValue(response) {
            var result = response.data;
            vm.clattachstatusCatagorys = coreService.covertCategoryValueIdToInt(result["YESNO"]);
        }

        //加载详细信息
        function loadMatter() {
            var params = {id: $scope.ngDialogData.matter_id};
            matterdetailservice.loadMatter(params)
                .then(setMatter);
        }

    }
})();

