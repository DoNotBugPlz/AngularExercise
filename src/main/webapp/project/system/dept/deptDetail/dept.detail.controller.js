(function () {
    'use strict';

    angular
        .module('app.dept')
        .controller('DeptDetailCtrl', DeptDetailCtrl);

    DeptDetailCtrl.$inject = ['$scope','$stateParams','deptDetailService','coreService','$q','ngDialog'];

    /* @ngInject */
    function DeptDetailCtrl($scope,$stateParams,deptDetailService,coreService,$q,ngDialog) {
        var vm =this;
        vm.otherelements={};
        var deptId = $stateParams.deptId;
        var loadDeptInf = loadDeptInf;
        vm.saveDeptInf = saveDeptInf;
        vm.selectParentDept = selectParentDept;
        vm.selectUnitDept = selectUnitDept;
        activate();
        function activate() {
            coreService.getCategoryValues("YESNO,DEPTLEVEL")
                .then(setCategoryValues)
                .then(loadDeptInf)
        }
        function setCategoryValues(response) {
            var result = response.data;
            vm.yesnoCatagory= coreService.covertCategoryValueIdToInt(result["YESNO"]);
            vm.deptlevelCatagory= coreService.covertCategoryValueIdToInt(result["DEPTLEVEL"]);
        }

        function loadDeptInf() {
            var params = {id:deptId};
            if(!angular.isUndefined(deptId)&&deptId!='null'&&deptId!=''){
                deptDetailService.loadDeptInf(params)
                    .then(setDeptInf);
            }else{
                vm.dept = {};
            }

        }
        function setDeptInf(response) {
            var result = response.data;
            vm.dept = result.sys_dept;
            vm.otherelements=result.otherelements;
        }
        function selectParentDept() {
            var checkedInf = [];
            if(vm.dept.parentid&&vm.otherelements['dept.chinaname']){
                checkedInf=[{id:vm.dept.parentid,name:vm.otherelements['dept.chinaname']}];
            }
            selectDept(checkedInf,setParentDept)
        }
        function setParentDept(value) {
            if(value.changeInf){//修改内容
                var deptSelectList = value.selectData;
                if(deptSelectList&&deptSelectList.length>0){
                    var temp = deptSelectList[0];
                    vm.dept.parentid = temp.id;
                    vm.otherelements['dept.chinaname'] = temp.name;
                }else{
                    vm.dept.parentid = -1;
                    vm.otherelements['dept.chinaname'] = "";
                }
            }
        }
        function selectUnitDept() {
            var checkedInf = [];
            if(vm.dept.unitid&&vm.otherelements['unit.chinaname']){
                checkedInf=[{id:vm.dept.unitid,name:vm.otherelements['unit.chinaname']}];
            }

            selectDept(checkedInf,setUnitDept)
        }
        function setUnitDept(value) {
            if(value.changeInf){//修改内容
                var deptSelectList = value.selectData;
                if(deptSelectList&&deptSelectList.length>0){
                    var temp = deptSelectList[0];
                    vm.dept.unitid = temp.id+','+deptSelectList[1].id;
                    vm.otherelements['unit.chinaname'] = temp.name+','+deptSelectList[1].name;
                }else{
                    vm.dept.unitid = -1;
                    vm.otherelements['unit.chinaname'] = "";
                }
            }
        }
        function selectDept(checkedInf,selectDeptCallBack) {
            ngDialog.open({
                title: '选择人员',
                template:"system/dept/deptSelect/dept.select.html",
                height:'500px',
                width:'700px',
                controller:'DeptSelectCtrl',
                data: {
                    zTreeSettingParams:{
                        multiple:false,
                        checkedInf:checkedInf
                    }
                },
                resolve: {
                    loadDeptSelectFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './system/dept/deptSelect/dept.select.controller.js',
                            './system/dept/deptSelect/dept.select.service.js',
                            'ng-zTree'
                        ]);
                    }
                },
                preCloseCallback:selectDeptCallBack
            });
        }

        function saveDeptInf(){
            if ($scope.dept_form.$valid) {
                var params = vm.dept;
                params = _.mapKeys(params, function(value, key) {
                    return "sys_dept." + key;
                });
                deptDetailService.saveDept(params)
                    .then(saveDeptInfSuccess)
            }else{
                AppTools.errorTips("请完善信息！");
            }
        }
        function saveDeptInfSuccess() {
            AppTools.successTips("保存成功！");
        }
    }
})();

