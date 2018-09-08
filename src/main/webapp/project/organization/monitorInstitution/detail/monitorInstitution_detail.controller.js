/**
 * Created by cr on 2018/8/27
 * 监测机构管理
 */
(function () {
    'use strict';

    angular
        .module('app.monitorInstitution')
        .controller('MonitorInstitutionDetailCtrl', MonitorInstitutionDetailCtrl);


    MonitorInstitutionDetailCtrl.$inject = ['$scope', '$stateParams', 'monitorInstitutionService', 'localStorageService', 'coreService', '$q', 'ngDialog'];

    /* @ngInject */
    function MonitorInstitutionDetailCtrl($scope, $stateParams, monitorInstitutionService, localStorageService, coreService, $q, ngDialog) {
        var vm = this;
        vm.deptId = $stateParams.deptId || '';//修改查看当前机构ID
        vm.parentId = $stateParams.parentId || '';//添加机构时所用的上级机构ID
        vm.dept_properties = $stateParams.dept_properties || '';//添加机构时上级部门性质
        vm.editFlag = $stateParams.editFlag || '';//操作标识 add添加,edit修改,view查看
        vm.deptType = $stateParams.deptType || '';//当前机构类型 1监测机构 2部门
        vm.saveDeptInfo = saveDeptInfo;
        vm.selectAreaInfo = selectAreaInfo;
        vm.selectUserInfo = selectUserInfo;
        activate();

        //////////////////////////////
        function activate() {
            coreService.getCategoryValues("YESNO,DEPTPROPERTY")
                .then(setCategory)
                .then(checkPageActive)
                .then(initPage)
                .then(loadDeptInf);
        }

        function setCategory(response) {
            //获取当前登录用户信息
            vm.user = localStorageService.get("currentUser") || {};
            vm.curUserDeptId = vm.user.deptid;

            //判断用户是否是超级管理员
            vm.isSuperManager = false;
            if (vm.user.personroles && vm.user.personroles.indexOf("99999") > -1) vm.isSuperManager = true;


            var result = response.data;
            vm.yesnoCatagory = coreService.covertCategoryValueIdToInt(result["YESNO"]);
            vm.deptProperty = coreService.covertCategoryValueIdToInt(result["DEPTPROPERTY"]);
            vm.deptStatus = [
                {id: 0, chinaname: "启用"},
                {id: 1, chinaname: "禁用"}
            ];

            return response;
        }

        /** 校验页面进入方式*/
        function checkPageActive(response) {
            //弹窗点入
            if ($scope.ngDialogData) {
                vm.deptId = $scope.ngDialogData.deptId || '';//修改查看当前机构ID
                vm.parentId = $scope.ngDialogData.parentId || '';//添加机构时所用的上级机构ID
                vm.dept_properties = $scope.ngDialogData.dept_properties || '';//添加机构时上级部门性质
                vm.editFlag = $scope.ngDialogData.editFlag || '';//操作标识 add添加,edit修改,view查看
                vm.deptType = $scope.ngDialogData.deptType || '';//当前机构类型 1监测机构 2部门
                vm.parentName = $scope.ngDialogData.parentName || '';
            }
            return response;
        }

        /** 初始化页面 */
        function initPage(response) {
            //判断使用哪种页面片段
            vm.showType = 'noData';//默认暂无数据
            vm.fileFlag = true; //附件按钮操作标识 true可上传可删除 false不可上传不可删除
            if (vm.deptType == 1) {
                if (vm.editFlag == 'add') {
                    vm.showType = 'addMonitor';
                } else if (vm.editFlag == 'edit') {
                    vm.showType = 'monitor';
                    //判断展示的监测机构不是自己,附件不可操作
                    if (vm.curUserDeptId != vm.deptId) {
                        vm.fileFlag = false;
                    }
                }
                else {
                    //展示流程页面附件不可用
                    vm.showType = 'monitor';
                    vm.fileFlag = false;
                }

                //初始化附件上传
                vm.fileInitOptions = {
                    fileListTitle: "附件",
                    opDetail: {
                        editOpShow: false,//不显示编辑
                        viewOpShow: false,//不显示预览
                        downLoadOpShow: true,//显示下载
                        // deleteOpShow:true,//显示删除
                        // uploadOpShow:true//显示上传
                        deleteOpShow: vm.fileFlag,//显示删除
                        uploadOpShow: vm.fileFlag//显示上传
                    },
                    tab_name: "t_dept",
                    col_name: "upload",
                    recordid: vm.deptId
                };
                vm.fileLoadOptions = {
                    tab_name: "t_dept",
                    col_name: "upload",
                    recordid: vm.deptId
                };
            } else if (vm.deptType == 2) {
                //部门
                vm.showType = 'dept';
            }
            return response;
        }

        /** 加载部门信息 */
        function loadDeptInf() {
            var params = {id: vm.deptId};
            if (vm.deptId) {
                monitorInstitutionService.getDeptInfoById(params)
                    .then(setDeptInf);
            } else {
                vm.deptInfo = {
                    parent_name:vm.parentName
                };
            }
        }

        function setDeptInf(response) {
            vm.deptInfo = response.data || {};
            if (!vm.deptInfo && vm.deptId) {
                vm.showType = 'noData';//有deptId但是查不到数据则显示无数据
            }
            if (vm.deptInfo) {
                //获取字段对应的字典项
                vm.deptStatus_text = vm.deptInfo.delstatus === 0 ? '启用' : '禁用';
                vm.isIndependentOffice = vm.deptInfo.is_independent_office === 0 ? '否' : '是';
                vm.dept_properties_text = transformNameByCategory(vm.dept_properties, vm.deptProperty);
            }
        }

        ////////////////////////////////////////

        /** 选择区域 */
        function selectAreaInfo() {
            if (vm.editFlag === 'view') {
                return;
            }
            var checkedInf = [];
            if (vm.deptInfo.area_id && vm.deptInfo.area_name) {
                checkedInf = [{id: vm.deptInfo.area_id, name: vm.deptInfo.area_name}];
            }
            selectArea(checkedInf, setArea)
        }

        function setArea(value) {
            if (value.changeInf) {//修改内容
                var areaSelectList = value.selectData;
                if (areaSelectList && areaSelectList.length > 0) {
                    var temp = areaSelectList[0];
                    vm.deptInfo.area_id = temp.id;
                    vm.deptInfo.area_name = temp.text;
                } else {
                    vm.deptInfo.area_id = '';
                    vm.deptInfo.area_name = '';
                }
            }
        }

        function selectArea(checkedInf, selectAreaCallBack) {
            ngDialog.open({
                title: '选择区域',
                template: "./area/areaSelect/area.select.html",
                height: '500px',
                width: '700px',
                controller: 'AreaSelectCtrl',
                data: {
                    zTreeSettingParams: {
                        multiple: false,
                        checkedInf: checkedInf
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
                preCloseCallback: selectAreaCallBack
            });
        }

        /** 选择人员 */
        function selectUserInfo() {
            if (vm.editFlag === 'view') {
                return;
            }
            var checkedInf = {is_one: true};
            if (vm.deptInfo.leader_id && vm.deptInfo.leader_name) {
                checkedInf.user_ids = vm.deptInfo.leader_id;
                checkedInf.userList = [{
                    id: vm.deptInfo.leader_id,
                    name: vm.deptInfo.leader_name,
                    dept_name: vm.deptInfo.chinaname
                }];
            }
            selectUser(checkedInf, setUser)

        }

        /** 设置人员 */
        function setUser(value) {
            if (value) {
                vm.deptInfo.leader_id = '';
                vm.deptInfo.leader_name = '';
                angular.forEach(value, function (data, index, array) {
                    vm.deptInfo.leader_id = data.sys_user_id;
                    vm.deptInfo.leader_name = data.name;
                });
            }
        }

        function selectUser(checkedInf, backUsers) {
            //选择人员弹框
            var title = '选择负责人员';
            ngDialog.open({
                title: title,
                template: "office/object_tree/object_tree.html",
                height: '600px',
                width: '1200px',
                controller: 'treeCtrl as vm',
                data: checkedInf,
                resolve: {
                    loadObjectTreeFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './office/object_tree/object_tree.controller.js',
                            './office/object_tree/object_tree.service.js',
                            'ng-zTree'
                        ]);
                    }
                },
                preCloseCallback: backUsers
            });
        }

        /** 保存或更新机构 */
        function saveDeptInfo(opType) {
            if (opType === 'dept' ? $scope.dept_form.$valid : opType === 'monitor' ? $scope.monitor_form.$valid : opType === 'addMonitor'? $scope.addMonitor_form.$valid:false) {
                var params = getSaveOrUpdateParams();
                monitorInstitutionService.saveOrUpdateDept(params)
                    .then(success, error)
            } else {
                AppTools.errorTips("请完善信息！");
            }

        }

        /** 组装实体 */
        function getSaveOrUpdateParams(){
            var params = {};
            //sys_dept部分
            params.sys_dept = {
                id:vm.deptInfo.id,
                deptlevel:vm.deptType,
                delstatus:vm.deptInfo.delstatus||0,//默认为启用
                sortindex:vm.deptInfo.sortindex||50,//默认为50
                chinaname:vm.deptInfo.chinaname,
                parentid:vm.deptInfo.parentid || vm.parentId,
                unitid:vm.deptInfo.unitid || vm.parentId
            };

            //cf_dept部分
            params.cf_dept_ext = {
                id:vm.deptInfo.cf_id,
                delstatus:vm.deptInfo.delstatus||0,//默认为启用
                dept_properties:vm.deptInfo.dept_properties || vm.dept_properties,
                person_num:vm.deptInfo.person_num,
                area_id:vm.deptInfo.area_id,
                address:vm.deptInfo.address,
                zip_code:vm.deptInfo.zip_code,
                fax:vm.deptInfo.fax,
                leader_id:vm.deptInfo.leader_id,
                warning_mobile:vm.deptInfo.warning_mobile,
                warning_telephone:vm.deptInfo.warning_telephone,
                credit_code:vm.deptInfo.credit_code,
                is_independent_office:vm.deptInfo.is_independent_office,
                union_dept_name:vm.deptInfo.union_dept_name
            };
            return params;
        }
        function success() {
            AppTools.successTips("保存成功！");
            //刷新数据
            if(vm.editFlag == 'edit'){
                loadDeptInf();
            }
            ngDialog.close($scope.ngDialogId);
        }

        function error() {
            AppTools.errorTips("保存失败! ")
        }

        /** 通过字典项将字段转换成名字 */
        function transformNameByCategory(data, categorys) {
            var text = "";
            _.forEach(categorys, function (n) {
                if (data === n.id) {
                    text = n.chinaname;
                }
            });
            return text;
        }

    }
})();

