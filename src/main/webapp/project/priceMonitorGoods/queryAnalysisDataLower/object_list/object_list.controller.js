/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function () {
    'use strict';
    angular
        .module('app.office')
        .controller('objectListCtrl', objectListCtrl);
    objectListCtrl.$inject = ['objectListService', '$scope', 'ngDialog', '$q', '_'];

    function objectListCtrl(objectListService, $scope, ngDialog, $q, _) {
        var vm = this;
        window.tree = vm;
        var config_id = $scope.ngDialogData.config_id;
        /* 临时存储所选中的用户 */
        var userListTemp = {};
        var deptuserListFilter = deptuserListFinter;
        var getDeptUsersSuccess = getDeptUsersSuccess;
        var loadSuccess = loadSuccess;
        var loadObjectListSuccess = loadObjectListSuccess;
        /* 初始化成功之后，选中已存在的记录 */
        var loadCheck = loadCheck;
        vm.confirmOp = confirmOp;
        vm.cancelOp = cancelOp;
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;
        vm.removeNode = removeNode;

        function activate() {
            $q.all([
                objectListService.loadObjectList({'config_id': config_id}),
                objectListService.getDeptUsers({})
            ]).then(loadSuccess).then(loadCheck);
        }

        function loadSuccess(responses) {
            loadObjectListSuccess(responses[0]);
            getDeptUsersSuccess(responses[1]);
            return null;
        }

        function loadObjectListSuccess(response) {
            vm.userList = response.data;
            /* 将user_id成为主id */
            _.forEach(vm.userList, function (item) {
                item.id=item.user_id;
                userListTemp[item.id] = item;
            });
            vm.userList = [];
            deptuserListFilter(userListTemp, vm.userList);
        }

        function getDeptUsersSuccess(response) {
            vm.deptUserList = response.data;
        }

        function loadCheck() {
            _.forEach(vm.deptUserList, function (item) {
                if (userListTemp[item.id]) {
                    item.selected = true;
                }
            });
        }

        function confirmOp() {
            ngDialog.close($scope.ngDialogId, {'userList': userListTemp});
        }

        function cancelOp() {
            ngDialog.close($scope.ngDialogId);
        }

        function selectAll() {
            vm.allSelected = !vm.allSelected;
            if (!angular.isUndefined(vm.deptUserList)) {
                _.forEach(vm.deptUserList, function (item) {
                    item.selected = vm.allSelected;
                    if (vm.allSelected) {
                        userListTemp[item.id] = item;
                    } else {
                        delete userListTemp[item.id];
                    }
                });
                vm.userList = [];
                deptuserListFilter(userListTemp, vm.userList);
            }
        }

        function selectItem(item) {
            item.selected = !item.selected;
            if (item.selected) {
                userListTemp[item.id] = item;
            } else {
                delete userListTemp[item.id];
            }
            vm.userList = [];
            deptuserListFilter(userListTemp, vm.userList)
        }

        function removeNode(n) {
            _.forEach(vm.deptUserList, function (item) {
                if (item.id == n.id) {
                    item.selected = false;
                }
            });
            delete userListTemp[n.id];
            vm.userList = [];
            deptuserListFilter(userListTemp, vm.userList)
        }

        function deptuserListFinter(A, B) {
            _.mapValues(A, function (data) {
                B.push(data);
            });
        }

        activate();
    }
})('../');
