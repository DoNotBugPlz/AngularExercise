(function () {
    'use strict';

    angular
        .module('app.monitoringIndexManage')
        .controller('IndexDetailCtrl', IndexDetailCtrl);

    IndexDetailCtrl.$inject = ['localStorageService', '$scope', 'IndexDetailService', 'ngDialog', 'coreService'];

    /* @ngInject */
    function IndexDetailCtrl(localStorageService, $scope, IndexDetailService, ngDialog, coreService) {
        var vm = this;
        vm.saveOrUpdateIndex = saveOrUpdateIndex;
        vm.addOption = addOption;
        vm.cancelDialog  = cancelDialog;
        vm.source_param  = $scope.ngDialogData;
        vm.operate_flag = false;        // 页面是否可操作开关
        if(vm.source_param.disabled_flag){  // 查看
            vm.operate_flag = true
        }
        if(vm.source_param.hasOwnProperty("disabled_flag") && !vm.source_param.disabled_flag && vm.source_param.index_nature == 3){       // 编辑页面，选项类的性质不可更改
            vm.index_nature_flag = true;
        }
        vm.sys_category_values = [
            {extchar1:"A",chinaname:"",refid:"",operable:true},
            {extchar1:"B",chinaname:"",refid:"",operable:true}
        ];
        var loadIndexDetailInfo = loadIndexDetailInfo;
        var setIndexDetailInfo = setIndexDetailInfo;
        var character = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        function activate() {
            loadCategory();
        }
        activate();
        function loadCategory() {
            coreService.getCategoryValues('INDEX_TYPE,BENCHMARK_INDEX,INDEX_PROPERTIES,DELATATUS')
                .then(setCategoryValues)
                .then(loadIndexDetailInfo)
        }

        function setCategoryValues(response){
            var result = response.data;
            vm.index_type = coreService.covertCategoryValueIdToInt(result["INDEX_TYPE"]);
            vm.benchmark_index = coreService.covertCategoryValueIdToInt(result["BENCHMARK_INDEX"]);
            vm.index_properties = coreService.covertCategoryValueIdToInt(result["INDEX_PROPERTIES"]);
            vm.delstatus = coreService.covertCategoryValueIdToInt(result["DELATATUS"]);
        }

        function loadIndexDetailInfo() {
            if(vm.source_param && vm.source_param.id){
                var params = {id: vm.source_param.id};
                IndexDetailService.loadIndexDetail(params)
                    .then(setIndexDetailInfo);
            }
        }

        function setIndexDetailInfo(response) {
            vm.cf_index = response.data.cf_index;
            vm.sys_category = response.data.sys_category;
            if(response.data.sys_category_values){
                vm.sys_category_values = response.data.sys_category_values;
            }
        }

        //增加选项
        function addOption() {
            var new_param = {chinaname:'',refid:'',operable:true};
            new_param.extchar1 = character[vm.sys_category_values.length];
            vm.sys_category_values.push(new_param)
        }

        //region 保存、暂存
        function saveOrUpdateIndex() {
            if($scope.index_form.$valid){
                var param  ={};
                param.cf_index = vm.cf_index;
                if(vm.cf_index.index_nature == 3){ // 性质：选项类
                    if(vm.sys_category){
                        param.sys_category = angular.extend(vm.sys_category,{chinaname:vm.cf_index.name});
                    }else{
                        param.sys_category = {chinaname:vm.cf_index.name};
                    }
                    param.list = dealCategoryValueList();
                }
                IndexDetailService.saveOrUpdateIndex(param)
                    .then(saveOrUpdateIndexSuccess);
            }else{
                AppTools.errorTips("所有数据必填！")
            }
        }

        function saveOrUpdateIndexSuccess(response) {
            vm.idnex = response.data;
            // initFileOptions(vm.demo.id);
            AppTools.successTips("保存成功！");
            ngDialog.close($scope.ngDialogId);
        }

        function dealCategoryValueList(){
            var array = [];
            _.forEach(vm.sys_category_values,function (item,i) {
                if(item.operable){      // 只可新增，不能修改之前的
                    var param = {};
                    param.chinaname = item.chinaname;
                    param.refid = item.refid;
                    param.extchar1 = item.extchar1;
                    array.push(param);
                }
            });
            return array;
        }

        function cancelDialog() {
            ngDialog.close($scope.ngDialogId);
        }
    }
})();

