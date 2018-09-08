/**
 * Created by cr on 2018/9/3
 * 监测机构人员管理
 */
(function () {
    'use strict';

    angular
        .module('app.monitorInstitution')
        .controller('MonitorInstitutionStaffCtrl', MonitorInstitutionStaffCtrl);

    MonitorInstitutionStaffCtrl.$inject = ['$q','$state','$scope','ngDialog','monitorInstitutionService','localStorageService','coreService','$stateParams','pageInfDefault'];

    /* @ngInject */
    function MonitorInstitutionStaffCtrl($q,$state,$scope,ngDialog,monitorInstitutionService,localStorageService,coreService,$stateParams,pageInfDefault) {
        var vm = this;
        window.x = vm;
        vm.selectAreaInfo = selectAreaInfo;
        vm.advSearchFun = advSearchFun;
        vm.resetSearch = resetSearch;
        vm.addUser = addUser;
        vm.searchList = searchList;
        vm.modUserDelstatus = modUserDelstatus;
        vm.batchModUserDelstatus = batchModUserDelstatus;
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;

        activate();

        function activate() {
            coreService.getCategoryValues('YESNO,USERSEX,EDUCATIONTYPE,CF_USERTYPE')
                .then(setCategory)
                .then(initPage)
                .then(loadUserList)
                .then(loadDeptTree);
        }

        /////////////////////////////////

        /** 设置加载项和获取当前登录用户 */
        function setCategory(response){
            //获取当前登录用户信息
            vm.user = localStorageService.get("currentUser")||{};
            //获取当前用户所属部门ID(SYS_dept主键)
            vm.curUserDeptId = vm.user.deptid;
            //获取字典项
            var result = response.data;
            vm.yesnoCatagory = coreService.covertCategoryValueIdToInt(result["YESNO"]) || [];
            vm.sexType = coreService.covertCategoryValueIdToInt(result['USERSEX']) || [];
            vm.educationType = coreService.covertCategoryValueIdToInt(result['EDUCATIONTYPE']) || [];
            vm.userType = coreService.covertCategoryValueIdToInt(result['CF_USERTYPE']) || [];
            //去掉userType中采价员选项
            _.forEach(vm.userType,function(data,index){
                if(data.chinaname === '采价员'){
                    vm.userType.splice(index,1)
                }
            });

            vm.userStatus = [
                {id:0,chinaname:'启用'},
                {id:1,chinaname:'禁用'}
            ];
            return response;
        }

        /** 初始化页面 */
        function initPage(response){
            //当前分页信息
            vm.currentPageInf = {
                pageNumber:pageInfDefault.pageNumberDefault,
                pageSize:pageInfDefault.pageSizeDefault
            };

            //可编辑操作标识
            vm.editFlag = true;
            vm.parentId = "";

            //初始化选择条件
            vm.searchParams = {};
            //默认将当前登录用户的部门id作为查询id
            vm.searchParams.dept_id = vm.curUserDeptId;
            //各层级管理员所属部门默认为监测机构,需要查询下属部门
            vm.searchParams.parent_id = vm.curUserDeptId;

            //初始化修改状态用户列表
            vm.selectedUserList = [];

            // 判断用户是否是省级管理员
            // vm.isProvinceManager = false;
            // if(vm.user.personroles && vm.user.personroles.indexOf("99999") > -1) vm.isProvinceManager = true;
            return null;
        }

        /** 获取部门树 */
        function loadDeptTree() {
            monitorInstitutionService.loadDeptTree()
                .then(setDeptTree);
        }

        /** 设置部门树 */
        function setDeptTree(response) {
            var result = response.data.rows;
            var zNodes = [];
            var setting = {
                async: {
                    enable: true,
                    url: '../Cf_dept_ext/LoadPageListForConfig.do',
                    autoParam: ["id"],
                    contentType: "application/json",
                    type: 'get',
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
            vm.zParams = {
                setting: setting,
                zNodes: zNodes
            };
            function zTreeFilter(treeId, parentNode, childNodes) {
                if (!childNodes) return null;
                return _.map(childNodes.rows, zNodeFilter);
            }
            function zNodeFilter(node) {
                node.checked = false;
                node.isParent = node.state=='open'?false:true;
                node.name = node.chinaname;
                if(node.delstatus){
                    node.icon="../project/lib/ztree/css/zTreeStyle/img/diy/del.png"
                }
                return node;
            }
        }

        /** 选择部门树节点 */
        function chooseNode(e, treeId, treeNode){
            var deptId = treeNode.id;
            var parentId = treeNode.parentid;
            var deptlevel = treeNode.deptlevel;

            //判断当前选择的部门是否是自己的部门
            if((deptlevel === 1 && deptId == vm.curUserDeptId) ||
                (deptlevel === 2 && parentId == vm.curUserDeptId)){
                //放开编辑操作
                vm.editFlag = true;
            }else{
                vm.editFlag = false;
            }

            //当前选中的节点是机构,需要联查查询下属部门
            if(treeNode.deptlevel == 1) vm.searchParams.parent_id = deptId;
            //拼入查询部门ID
            vm.searchParams.dept_id = deptId;

            //查询用户列表
            searchList();
        }

        /** 查询人员列表 */
        function loadUserList(pageNumber,pageSize) {
            //清空选择数组和重置总选按钮
            vm.selectedUserList = [];
            vm.allSelected = false;
            var pageInf = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf,vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInf);
            monitorInstitutionService.loadUserList(params)
                .then(function(response){
                    setUserList(response,params.pageNumber)
                });
        }

        function setUserList(response,pageNum) {
            var result = response.data;
            vm.userList = result.rows;
            _.forEach(vm.userList,function(item){
                item.selected = false;
            });
            vm.userListPage = angular.extend({pageTurn: 'loadUserList',pagenum:pageNum}, result);
            return null;
        }

        ////////////////////////////////////

        /** 选择区域 */
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

        ////////////////////////////////////

        /** 搜索列表 */
        function searchList() {
            loadUserList(vm.currentPageInf.pageNumber,vm.currentPageInf.pageSize)
        }

        /** 高级检索按钮 */
        function advSearchFun(){
            vm.advSearch=!vm.advSearch;
        }


        /** 重置查询条件 */
        function resetSearch(){
            vm.searchParams = {};
            //重新刷新部门机构树
            loadDeptTree();
        }

        /** 多选操作 */
        function selectAll(dataList) {
            vm.allSelected=!vm.allSelected;
            vm.selectedUserList = [];
            if(!angular.isUndefined(dataList)){
                _.forEach(dataList,function (item) {
                    item.selected=vm.allSelected;
                    if(vm.allSelected){
                        vm.selectedUserList.push(item.userExt_id)
                    }
                })
            }
        }

        /** 单选操作 */
        function selectItem(n) {
            //更新选择数组
            vm.selectedUserList = [];
            _.forEach(vm.userList, function (item) {
                if (n.id === item.id) {
                    item.selected = !item.selected;
                }
                if (item.selected) {
                    vm.selectedUserList.push(item.userExt_id);
                }
            });

        }

        ///////////////////////////////////////

        /** 单个修改用户状态*/
        function modUserDelstatus(userExt_id,status){
            //清空列表
            vm.selectedUserList = [];
            //将选中的用户ID存入列表
            vm.selectedUserList.push(Number(userExt_id));
            //修改状态
            batchModUserDelstatus(status)
        }

        /** 批量修改用户状态状态 */
        function batchModUserDelstatus(status){
            if(vm.selectedUserList.length == 0){
                AppTools.infoTips("请选择至少一个选项");
                return null;
            }

            var params = {
                delstatus:Number(status),
                userExtIdList:vm.selectedUserList
            };
            monitorInstitutionService.batchModUserDelstatus(params)
                .then(modSuccess, modError);

            function modSuccess(){
                AppTools.successTips("修改成功！");
                //刷新数据
                searchList();
            }

            function modError(){
                AppTools.errorTips("修改失败! ")
            }
        }



        function addUser(opFlag){
            //opFlag添加标识 1 为监测机构 2为部门
            var params = {
                parentId:vm.addParentId,
                parentName:vm.parentName,
                deptType:opFlag,
                dept_properties:vm.dept_properties+1,//添加部门或机构比上级单位多1
                editFlag:'add'
            };

            var title = opFlag==1? '新增机构':'新增部门';

            //添加部门或机构弹窗
            ngDialog.open({
                title: title,
                template:"organization/monitorInstitution/detail/monitorInstitution_detail.html",
                height:'550px',
                width:'800px',
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
                },
                preCloseCallback:function () {
                    loadDeptTree();
                }
            });
        }



    }
})();

