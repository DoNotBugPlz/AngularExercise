/**
 * Created by pancuican@1193 on 2017/9/27.
 */
(function () {
    'use strict';
    angular
        .module('app.office')
        .controller('SelfNoticeCtrl', SelfNoticeCtrl);
    SelfNoticeCtrl.$inject = ['$scope', '$window', '$stateParams', 'selfNoticeService', 'coreService', 'pageInfDefault', 'ngDialog', '_', '$q'];

    /* @ngInject */
    function SelfNoticeCtrl($scope, $window, $stateParams, selfNoticeService, coreService, pageInfDefault, ngDialog, _, $q) {
        var vm = this;
        vm.title = 'DesktopCtrl';
        vm.viewNotice = viewNotice;
        vm.readSelectNotice = readSelectNotice;
        vm.loadNoticeList = loadNoticeList;
        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        /* 初始化加载 */
        var loadSuccess = loadSuccess;
        var readNoticeAll = readNoticeAll;

        /*****/
        var setNoticeList = setNoticeList;
        var refreshList = refreshList;
        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };
        /*查询条件初始化*/
        vm.searchParams = {};
        vm.searchParams.is_read = 0;
        /* 设置默认类型为通知公告 */
        vm.searchParams.data_type = 1;
        activate();

        ////////////////
        function activate() {
            loadNoticeList();
            $q.all([coreService.getCategoryValues('ISREAD')])
                .then(loadSuccess);
        }

        function loadSuccess(responses) {
            vm.category_is_read = coreService.covertCategoryValueIdToInt(responses[0].data["ISREAD"]);
        }

        function viewNotice(notice) {
            if (!notice.is_read) {
                notice.is_read = !notice.is_read;
                readNoticeAll(notice.object_id);
            }
            opNotice("查看消息通知", {"noticeId": notice.id, "is_view": true});

        }


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

        function opNotice(title, params) {
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            ngDialog.open({
                title: title,
                template: "office/selfNotice/detail/selfNotice.detail.html",
                height: height,
                width: width,
                controller: 'SelfNoticeDetailCtrl as vm',
                data: params,
                resolve: {
                    loadNoticeDetailFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './office/selfNotice/detail/selfNotice.detail.controller.js',
                            './office/selfNotice/detail/selfNotice.detail.service.js',
                            'mCustomScrollbar'
                        ]);
                    }
                },
                preCloseCallback: function () {
                    refreshList();
                }
            });
        }

        function loadNoticeList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            selfNoticeService.loadNoticeList(params)
                .then(function (response) {
                    setNoticeList(response, params.pageNumber)
                });
        }


        /*刷新列表*/
        function refreshList() {
            loadNoticeList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }

        function setNoticeList(response, pageNum) {
            var result = response.data;
            vm.noticeList = result.rows;
            vm.noticeListPage = angular.extend({pageTurn: 'loadNoticeList', pagenum: pageNum}, result);
        }

        function getAllSelectId() {
            return _.map(_.filter(vm.noticeList, function (item) {
                return item.selected;
            }), function (item) {
                return item.object_id;
            });
        }

        function readSelectNotice() {
            readNoticeAll(getAllSelectId().join(","));
        }

        function readNoticeAll(object_ids) {
            if (!object_ids) {
                AppTools.errorTips('请选择要读取的通知！');
                return;
            }
            selfNoticeService.readNotices({'object_ids': object_ids}).then(function (response) {
                if (object_ids.indexOf(',') > -1)
                    refreshList();
                AppTools.successTips("读取成功！");
            });
        }

        $scope.$watch('vm.searchParams.is_read', function (newValue, oldValue) {
            if (newValue != oldValue) {
                vm.loadNoticeList();
            }
        });

    }

})
();

