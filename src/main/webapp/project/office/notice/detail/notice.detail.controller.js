/**
 * @author maxzhao
 * @time 2018/08/15.
 */
(function () {
    'use strict';

    angular
        .module('app.office')
        .controller('NoticeDetailCtrl', NoticeDetailCtrl);

    NoticeDetailCtrl.$inject = ['localStorageService', '$scope', 'ngDialog', 'coreService', 'officeService'];

    /* @ngInject */
    function NoticeDetailCtrl(localStorageService, $scope, ngDialog, coreService, officeService) {
        var vm = this;
        window.n = vm;
        vm.title = "NoticeDetailCtrl";
        var noticeId = $scope.ngDialogData.noticeId;
        vm.is_view = $scope.ngDialogData.is_view;
        var loadNotice = loadNotice;
        var setNotice = setNotice;
        var backUsers = backUsers;
        vm.saveNotice = saveNotice;
        vm.temporaryNotice = temporaryNotice;
        vm.cancelOp = cancelOp;
        vm.openObjectTree = openObjectTree;

        activate();

        function activate() {

            coreService.getCategoryValues('YESNO')
                .then(setCategoryValues)
                .then(function () {
                    if (!angular.isUndefined(noticeId)) {
                        loadNotice(noticeId);
                        initFileOptions(noticeId);
                    } else {
                        initFileOptions("");
                    }
                });
        }

        //region 文件上传
        var fileInitOptions = {
            fileListTitle: "附件列表",
            tab_name: "t_notice",
            col_name: "id",
            recordid: ""
        };
        var fileLoadOptions = {
            tab_name: "t_notice",
            col_name: "id",
            recordid: ""
        };

        function initFileOptions(notice_id) {
            fileInitOptions.recordid = notice_id;
            fileLoadOptions.recordid = notice_id;
            initFileList();
        }

        function initFileList() {
            vm.fileInitOptions = fileInitOptions;
            vm.fileLoadOptions = fileLoadOptions;
        }

        //endregion
        function setCategoryValues(response) {
            var result = response.data;
            vm.yesnoCatagory = coreService.covertCategoryValueIdToInt(result["YESNO"]);
            return null;
        }

        function loadNotice(noticeId) {
            var params = {id: noticeId};
            return officeService.loadNotice(params)
                .then(setNotice);
        }

        function setNotice(response) {
            vm.notice = response.data.notice;
            var users = {};
            angular.forEach(response.data.users, function (data, index, arr) {
                data.id = data.user_id;
                users[data.id] = data;
            });
            backUsers(users);
        }

        //region 保存、暂存
        function saveNotice() {
            if ($scope.notice_form.$valid) {
                var params = vm.notice;
                params.data_type = 1;
                params.is_public = 1;
                params.user_ids = vm.user_ids;
                officeService.saveNotice(params)
                    .then(saveNoticeSuccess)
            } else {
                console.log($scope.notice_form);
            }

        }

        function temporaryNotice() {
            if ($scope.notice_form.$valid) {
                var params = vm.notice;
                params.data_type = 1;
                params.is_public = 2;
                params.user_ids = vm.user_ids;
                officeService.saveNotice(params)
                    .then(temporaryNoticeSuccess)
            } else {
                console.log($scope.notice_form);
            }
        }

        function saveNoticeSuccess(response) {
            if (!vm.notice.id) {
                vm.notice.id = response.data;
            }
            loadNotice(vm.notice.id).then(function (data) {
                initFileOptions(vm.notice.id);
                AppTools.successTips("保存成功！");
            });
        }

        function temporaryNoticeSuccess(response) {
            if (!vm.notice.id) {
                vm.notice.id = response.data;
            }
            loadNotice(vm.notice.id).then(function (data) {
                initFileOptions(vm.notice.id);
                AppTools.successTips("暂存成功！");
            });
        }

        function cancelOp() {
            vm.test = {"recordid": "1"};
            ngDialog.close($scope.ngDialogId);
        }

        //endregion

        function openObjectTree(title, params) {
            if (vm.is_view) {
                return;
            }
            title = '选择发布对象';
            if (!params) {
                params = {};
            }
            if (vm.userList) {
                params.userList = vm.userList;
            }
            ngDialog.open({
                title: title,
                template: "office/object_tree/object_tree.html",
                height: '600px',
                width: '1200px',
                controller: 'treeCtrl as vm',
                data: params,
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

        function backUsers(callBackData) {
            if (!callBackData || callBackData == '$closeButton') {
                return;
            }
            vm.userList = [];
            vm.user_ids = '';
            var user_ids = '', user_names = '';
            /* 获取返回结果 */
            angular.forEach(callBackData, function (data, index, array) {
                vm.userList.push(data);
                user_ids += user_ids ? ',' + data.id : data.id;
                user_names += user_names ? ',' + data.name : data.name;
                user_names += '(' + data.dept_name + ')';
            });
            if (vm.notice) {
                vm.notice.notice_object = user_names;
            } else {
                vm.notice = {"notice_object": user_names};
            }
            vm.user_ids = user_ids;
        }

    }

})();

