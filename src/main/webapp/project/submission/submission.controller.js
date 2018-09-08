(function () {
    'use strict';
    angular
        .module('app.submission')
        .controller('SubmissionCtrl', SubmissionCtrl);
    SubmissionCtrl.$inject = ['$scope', '$stateParams', 'submissionService', 'coreService', 'pageInfDefault', 'ngDialog', '_'];

    /* @ngInject */
    function SubmissionCtrl($scope, $stateParams, submissionService, coreService, pageInfDefault, ngDialog, _) {
        var vm = this;
        window.a = vm;
        //加载数据列表
        vm.loadSubmissionList = loadSubmissionList;
        //重置
        vm.reset = reset;
        //报送
        vm.submissionMaterial = submissionMaterial;


        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;

        function selectAll() {
            vm.allSelected = !vm.allSelected;
            if (!angular.isUndefined(vm.submissionList)) {
                _.forEach(vm.submissionList, function (item) {
                    item.selected = vm.allSelected;
                })

            }
        }

        function selectItem(item) {
            item.selected = !item.selected;
        }


        /*****/
        var setSubmissionList = setSubmissionList;
        var refreshList = refreshList;
        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };

        activate();

        ////////////////
        function activate() {
            //加载数据列表
            loadSubmissionList();
            //加载字典项
            coreService.getCategoryValues('CLATTACHTYPE')
                .then(setCategoryValues);
        }

        function setCategoryValues(response) {
            var result = response.data;
            vm.clattachtypeCatagory = coreService.covertCategoryValueIdToInt(result["CLATTACHTYPE"]);
        }

        //重置
        function reset() {
            vm.searchParams = {};
        }

        //加载数据列表
        function loadSubmissionList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            submissionService.loadSubmissionList(params)
                .then(function (response) {
                    setSubmissionList(response, params.pageNumber)
                });
        }

        //报送
        function submissionMaterial(material) {
            opSubmission("监测材料报送", {"materialId": material.id, "mainId": material.mainId, "is_view": true});
        }

        //打开报送页
        function opSubmission(title, params) {
            ngDialog.open({
                title: title,
                template: "submission/detail/submission.detail.html",
                height: '600px',
                width: '1000px',
                controller: 'submissionDetailCtrl as vm',
                data: params,
                resolve: {
                    loadSubmissionMaterialFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './submission/detail/submission.detail.controller.js',
                            './submission/detail/submission.detail.service.js',
                            'ng-zTree',
                            'My97DatePicker'
                        ]);
                    }
                },
                preCloseCallback: function () {
                    refreshList();
                }
            });
        }


        //刷新列表
        function refreshList() {
            loadSubmissionList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }

        function setSubmissionList(response, pageNum) {
            var result = response.data;
            vm.submissionList = result.rows;
            vm.submissionListPage = angular.extend({pageTurn: 'loadSubmissionList', pagenum: pageNum}, result);
        }

    }

})();

