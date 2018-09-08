/**
 * @author maxzhao
 * @time 2018/08/15.
 */
(function () {
    'use strict';
    angular
        .module('app.office')
        .controller('TrainingCtrl', TrainingCtrl);
    TrainingCtrl.$inject = ['$scope', '$stateParams', 'officeService', 'pageInfDefault', 'ngDialog', '_', '$window'];

    /* @ngInject */
    function TrainingCtrl($scope, $stateParams, officeService, pageInfDefault, ngDialog, _, $window) {
        var vm = this;
        /*全局属性 notice_type=1  为通知公告*/
        vm.data_type = 2;
        vm.title = 'TrainingCtrl';
        vm.addNotice = addNotice;
        vm.delSelectNotice = delSelectNotice;
        vm.viewNotice = viewNotice;
        vm.editNotice = editNotice;

        vm.is_publicNotice = is_publicNotice;
        vm.delNoticeList = delNoticeList;
        vm.loadNoticeList = loadNoticeList;
        vm.reset = reset;
        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;

        function selectAll() {
            vm.allSelected = !vm.allSelected;
            if (!angular.isUndefined(vm.noticeList)) {
                _.forEach(vm.noticeList, function (item) {
                    item.selected = vm.allSelected;
                })

            }
        }

        function selectItem(item) {
            item.selected = !item.selected;
        }

        /*****/
        var setNoticeList = setNoticeList;
        var refreshList = refreshList;
        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };
        /*默认状态*/
        vm.category_is_public = [{id: 1, text: "发布"}, {id: 2, text: "暂存"}, {id: 0, text: "取消"}];
        activate();

        ////////////////
        function activate() {
            loadNoticeList();
        }

        function addNotice() {
            opNotice("新增学习培训", {});
        }

        function viewNotice(notice) {
            opNotice("查看学习培训", {"noticeId": notice.id, "is_view": true});
        }

        function editNotice(notice) {
            opNotice("修改学习培训", {"noticeId": notice.id});
        }

        function opNotice(title, params) {
            ngDialog.open({
                title: title,
                template: "office/training/detail/training.detail.html",
                height: '700px',
                width: '800px',
                controller: 'TrainingDetailCtrl as vm',
                data: params,
                resolve: {
                    loadNoticeDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './office/training/detail/training.detail.controller.js',
                            'My97DatePicker'
                        ]);
                    }
                },
                preCloseCallback: function () {
                    refreshList();
                }
            });
        }

        function reset() {
            vm.searchParams = {};
        }

        function delNoticeList(notice) {
            var noticeIds = notice.id;
            if (angular.isUndefined(noticeIds) || noticeIds === '') {
                AppTools.errorTips("请选择要删除的记录");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？", function () {
                var params = {"notice_ids": noticeIds};
                officeService.delNoticeList(params).then(function () {
                    refreshList();
                    AppTools.successTips("删除成功！");
                });
            });
        }

        function loadNoticeList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            params.data_type = vm.data_type;
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            officeService.loadNoticeList(params)
                .then(function (response) {
                    setNoticeList(response, params.pageNumber)
                });
        }

        function is_publicNotice(notice) {
            var noticeIds = notice.id;
            var title = (notice.is_public === 0 || notice.is_public === 2) ? '发布' : '取消';
            if (angular.isUndefined(noticeIds) || noticeIds === '') {
                AppTools.errorTips("请选择要" + title + "的记录");
                return;
            }
            AppTools.confirm("确定" + title + "此记录吗？", function () {
                var params = notice;
                params.is_public = (notice.is_public === 0 || notice.is_public === 2) ? '1' : '0';
                delete  params.is_public_text;
                delete  params.date_type_text;
                officeService.saveNotice(params).then(function () {
                    refreshList();
                    AppTools.successTips(title + "成功！");
                });
            });
        }

        //刷新列表
        function refreshList() {
            loadNoticeList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize);
        }

        function setNoticeList(response, pageNum) {
            var result = response.data;
            vm.noticeList = result.rows;
            vm.noticeListPage = angular.extend({pageTurn: 'loadNoticeList', pagenum: pageNum}, result);
        }

        function delSelectNotice() {
            delNoticeList({"id": getAllSelectId().join(",")});
        }


        function getAllSelectId() {
            return _.map(_.filter(vm.noticeList, function (item) {
                return item.selected;
            }), function (item) {
                return item.id;
            });
        }

        vm.opOffice = function (title, params) {
            title = "测试";
            params = {};
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            ngDialog.open({
                title: title,
                template: "weboffice/weboffice.html",
                height: height * 0.9 + 'px',
                width: width * 0.9 + 'px',
                controller: 'webOfficeCtrl as vm',
                data: params,
                resolve: {
                    loadWebOfficeFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './weboffice/weboffice.controller.js',
                            './weboffice/weboffice.directive.js'
                        ]);
                    }
                },
                preCloseCallback: function () {

                }
            });
        }
    }

})();

