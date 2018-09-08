/**
 * Created by cr on 2018/8/27
 * 监测机构列表查询
 */
(function () {
    'use strict';

    angular
        .module('app.monitorInstitution')
        .controller('MonitorInstitutionListCtrl', MonitorInstitutionListCtrl);

    MonitorInstitutionListCtrl.$inject = ['$scope','pageInfDefault','monitorInstitutionService','coreService','ngDialog'];

    /* @ngInject */
    function MonitorInstitutionListCtrl($scope,pageInfDefault,monitorInstitutionService,coreService,ngDialog) {
        var vm = this;
        vm.advSearchFun = advSearchFun;
        vm.resetSearch = resetSearch;
        vm.searchList = searchList;
        vm.selectAreaInfo = selectAreaInfo;
        vm.readDetail = readDetail;
        vm.selectQueryType = selectQueryType;
        activate();

        function activate() {
            //加载字典项
            coreService.getCategoryValues('YESNO,DEPTPROPERTY')
                .then(setCategory)
                .then(initPage)
                .then(loadDeptList);

        }

        //////////////////////////////

        /** 设置字典项 */
        function setCategory(response){
            var result = response.data;
            vm.yesnoCatagory = coreService.covertCategoryValueIdToInt(result["YESNO"]) || [];
            vm.deptProperty = coreService.covertCategoryValueIdToInt(result['DEPTPROPERTY']) || [];
            vm.deptStatus = [
                {id:0,chinaname:'启用'},
                {id:1,chinaname:'禁用'}
            ];
            return response;
        }

        /** 初始化页面 */
        function initPage(){

            vm.currentPageInf = {
                pageNumber:pageInfDefault.pageNumberDefault,
                pageSize:pageInfDefault.pageSizeDefault
            };

            //高级查询标识
            vm.advSearch = false;

            //初始化查询条件
            vm.searchParams = {};

            //初始化是否查询普通部门标识 false为不查,true为查询
            vm.searchParams.queryDept = false;
            return null;
        }

        /** 查询机构信息 */
        function loadDeptList(pageNumber,pageSize) {
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            monitorInstitutionService.loadDeptList(params)
                .then(function(response){
                    setDeptList(response,params.pageNumber)
                });
        }

        function setDeptList(response,pageNum) {
            var result = response.data;
            vm.deptList = result.rows;
            vm.deptListPage = angular.extend({pageTurn: 'loadDeptList',pagenum:pageNum}, result);
        }

        //////////////////////////////

        /** 选择是否查询普通部门 */
        function selectQueryType(){
            vm.searchParams.queryDept = !vm.searchParams.queryDept;
        }

        /** 查看详情 */
        function readDetail(data) {
            var params = {
                deptId:data.id,
                parentId:data.parentId,
                deptType:data.deptlevel,
                dept_properties:data.dept_properties,
                editFlag:'view'
            };

            var title = data.deptlevel==1? '查看机构详情':'查看部门详情';

            //添加部门或机构弹窗
            ngDialog.open({
                title: title,
                template:"organization/monitorInstitution/detail/monitorInstitution_detail_view.html",
                height:'550px',
                width:'1000px',
                controller:'MonitorInstitutionDetailCtrl as vm',
                data:params,
                resolve: {
                    loadMonitorInstitutionEdit: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './organization/monitorInstitution/detail/monitorInstitution_detail.controller.js',
                            './organization/monitorInstitution/monitorInstitution.service.js',
                            './utils/app.checkboxSel.js',
                            'My97DatePicker',
                            'chosen'
                        ]);
                    }
                }
            });
        }

        /** 搜索列表 */
        function searchList() {
            loadDeptList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        /** 高级检索按钮 */
        function advSearchFun(){
            vm.advSearch=!vm.advSearch;
        }

        /** 置空查询条件 */
        function resetSearch(){
            vm.searchParams = {};
            vm.searchParams.queryDept = false;
        }

        //////////////////////////////

        function selectAreaInfo(){
            var checkedInf = [];
            if(vm.searchParams.area_id&&vm.searchParams.area_name){
                checkedInf = [{id:vm.searchParams.area_id,name:vm.searchParams.area_name}];
            }
            selectArea(checkedInf,setArea)
        }

        function setArea(value){
            if(value.changeInf){//修改内容
                var areaSelectList = value.selectData;
                if(areaSelectList&&areaSelectList.length>0){
                    var temp = areaSelectList[0];
                    vm.searchParams.area_id = temp.id;
                    vm.searchParams.area_name = temp.text;
                }else{
                    vm.searchParams.area_id = '';
                    vm.searchParams.area_name = '';
                }
            }
        }

        function selectArea(checkedInf,selectAreaCallBack){
            ngDialog.open({
                title: '选择区域',
                template:"./area/areaSelect/area.select.html",
                height:'500px',
                width:'700px',
                controller:'AreaSelectCtrl',
                data: {
                    zTreeSettingParams:{
                        multiple:false,
                        checkedInf:checkedInf
                    }
                },
                resolve: {
                    loadAreaSelectFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './area/areaSelect/area.select.controller.js',
                            './area/areaSelect/area.select.service.js',
                            'ng-zTree'
                        ]);
                    }
                },
                preCloseCallback:selectAreaCallBack
            });
        }
    }
})();

