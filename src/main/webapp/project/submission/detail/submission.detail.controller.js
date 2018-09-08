(function () {
    'use strict';

    angular
        .module('app.submission')
        .controller('submissionDetailCtrl', submissionDetailCtrl);

    submissionDetailCtrl.$inject = ['$scope', 'ngDialog', 'coreService', 'submissionDetailService'];

    /* @ngInject */
    function submissionDetailCtrl($scope, ngDialog, coreService, submissionDetailService) {
        var vm = this;
        //父级页面传参--数据id
        var materialId = $scope.ngDialogData.materialId;
        var mainId = $scope.ngDialogData.mainId;
        //父级页面传参--查看标识
        vm.is_view = $scope.ngDialogData.is_view;
        //加载详细信息
        var loadMaterial = loadMaterial;
        //关闭弹窗页
        vm.cancelOp = cancelOp;
        //保存报送信息
        vm.saveSubmission = saveSubmission;
        //加载子级字典项
        vm.clattachtypeOp = clattachtypeOp;

        //正文、附件
        var fileZwInitOptions = {
            fileListTitle: "正文列表",
            tab_name: "t_demo",
            col_name: "upload_zw",
            recordid: ""
        };
        var fileZwLoadOptions = {
            tab_name: "t_demo",
            col_name: "upload_zw",
            recordid: ""
        };
        var fileInitOptions = {
            fileListTitle: "附件列表",
            tab_name: "t_material_submission",
            col_name: "upload_fj",
            recordid: ""
        };
        var fileLoadOptions = {
            tab_name: "t_material_submission",
            col_name: "upload_fj",
            recordid: ""
        };
        activate();

        ////////////////
        function activate() {
            coreService.getCategoryValues('CLATTACHTYPE,CLATTCHPUBLICOBJECT,CLATTACHREPORTOBJECT')
                .then(setCategoryValues)
                .then(function () {
                    loadMaterial(materialId, mainId);
                    if (!angular.isUndefined(mainId)) {
                        initFileOptions(mainId);
                    } else {
                        initFileOptions("");
                    }
                });
        }

        function initFileOptions(mainId) {
            fileZwInitOptions.recordid = mainId;
            fileZwLoadOptions.recordid = mainId;
            fileInitOptions.recordid = mainId;
            fileLoadOptions.recordid = mainId;
            initFileList();
        }

        function initFileList() {
            vm.fileZwInitOptions = fileZwInitOptions;
            vm.fileZwLoadOptions = fileZwLoadOptions;
            vm.fileInitOptions = fileInitOptions;
            vm.fileLoadOptions = fileLoadOptions;
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.clattachtypeCatagory = coreService.covertCategoryValueIdToInt(result["CLATTACHTYPE"]);
            vm.clattchpublicobjectCatagory = coreService.covertCategoryValueIdToInt(result["CLATTCHPUBLICOBJECT"]);
            vm.clattachreportobjectCatagory = coreService.covertCategoryValueIdToInt(result["CLATTACHREPORTOBJECT"]);
        }


        //父级字典项改变事件
        function clattachtypeOp() {
            if (vm.material.clattachtype) {
                coreService.getCategoryValues('CLATTACHTYPE' + '_' + vm.material.clattachtype)
                    .then(setSubCategoryValues)
            }
        }

        function setSubCategoryValues(response) {
            var result = response.data;
            vm.clattach_sub_typeCatagory = coreService.covertCategoryValueIdToInt(result['CLATTACHTYPE' + '_' + vm.material.clattachtype]);
        }

        //加载详细信息
        function loadMaterial(materialId, mainId) {
            var params = {materialid: materialId, submissionid: mainId};
            submissionDetailService.loadMaterial(params)
                .then(setMaterial);
        }

        function setMaterial(response) {
            vm.material = response.data.t_material_info;
            vm.submission = response.data.t_material_submission;
            clattachtypeOp();
            if (vm.submission) {
                initFileOptions(vm.submission.id);
            }
        }

        //保存
        function saveSubmission(status) {
            if ($scope.submission_form.$valid) {
                vm.submission.status = status;
                vm.submission.material_id = vm.material.id;
                var params = {};
                params["t_material_info"] = vm.material;
                params["t_material_submission"] = vm.submission;
                submissionDetailService.saveSubmission(params)
                    .then(saveSubmissionSuccess)
            } else {
                AppTools.errorTips("请确保信息填写完整无误！")
            }

        }

        function saveSubmissionSuccess(response) {
            vm.submission = response.data;
            initFileOptions(vm.submission.id);
            AppTools.successTips("保存成功！");
        }

        //关闭弹窗
        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }


    }
})();

