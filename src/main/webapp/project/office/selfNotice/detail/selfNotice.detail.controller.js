(function () {
    'use strict';

    angular
        .module('app.office')
        .controller('SelfNoticeDetailCtrl', SelfNoticeDetailCtrl);

    SelfNoticeDetailCtrl.$inject = ['localStorageService', '$scope', 'selfNoticeDetailService', 'ngDialog', 'coreService', '$q'];

    /* @ngInject */
    function SelfNoticeDetailCtrl(localStorageService, $scope, selfNoticeDetailService, ngDialog, coreService, $q) {
        var vm = this;
        var noticeId = $scope.ngDialogData.noticeId;
        vm.is_view = $scope.ngDialogData.is_view;
        var loadFile = loadFile;
        var loadNotice = loadNotice;
        var loadSuccess = loadSuccess;
        vm.cancelOp = cancelOp;

        activate();

        function activate() {
            if (!noticeId) {
                AppTools.errorTips('通知不存在!');
                cancelOp();
            }

            // coreService.getCategoryValues('YESNO')
            //     .then(setCategoryValues)
            //     .then(loadNotice)
            //     .then(loadFile);
            $q.all([
                loadNotice(),
                loadFile()
            ]).then(loadSuccess);
        }

        function loadSuccess(responses) {
        }

        function loadNotice() {
            var params = {id: noticeId};
            selfNoticeDetailService.loadNotice(params)
                .then(setNotice);
            return null;
        }

        function loadFile() {
            if (!angular.isUndefined(noticeId)) {
                initFileOptions(noticeId);
            } else {
                initFileOptions("");
            }
            return null;
        }

        //region 文件上传
        function initFileOptions(notice_id) {
            vm.fileInitOptions = {
                fileListTitle: "附件列表",
                opDetail: {
                    editOpShow: false,//不显示编辑
                    viewOpShow: true,//显示预览
                    downLoadOpShow: true,//显示下载
                    deleteOpShow: false,//显示删除
                    uploadOpShow: false//显示上传
                },
                tab_name: "t_notice",
                col_name: "id",
                recordid: ""
            };
            vm.fileLoadOptions = {
                tab_name: "t_notice",
                col_name: "id",
                recordid: ""
            };
            vm.fileInitOptions.recordid = notice_id;
            vm.fileLoadOptions.recordid = notice_id;
        }

        //endregion
        function setNotice(response) {
            vm.notice = response.data.notice;
        }

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        //endregion
    }
})();

