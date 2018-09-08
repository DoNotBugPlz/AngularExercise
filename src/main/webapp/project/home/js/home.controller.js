/**
 * 框架首页
 */

(function () {
    'use strict';
    angular.module('app.home')
        .controller("HomeCtrl", HomeCtrl);

    HomeCtrl.$inject = ['$location', '$state', '$scope', 'localStorageService', 'homeService', '$q', 'coreService', 'ngDialog', '_', 'loginService', '$timeout'];

    function HomeCtrl($location, $state, $scope, localStorageService, homeService, $q, coreService, ngDialog, _, loginService, $timeout) {
        var vm = this;
        vm.title = "HomeCtrl";
        vm.leftSlideFlag = true;
        vm.leftSlideOpName = "收起";
        vm.rightSlideFlag = localStorageService.get("rightSlideFlag") || false;
        vm.activeMenuInf = {
            firstMenu: {},
            secondMenu: {},
            thirdMenu: {}
        }
        vm.quit = quit;
        var getShowMenus = getShowMenus;
        var getShortcutMenu = getShortcutMenu;
        vm.getAndSetSecMenus = getAndSetSecMenus;
        vm.getAndSetThhirdMenus = getAndSetThhirdMenus;
        vm.getAndSetChildrenMenus = getAndSetChildrenMenus;
        vm.menuClick = menuClick;
        vm.leftSlideMenu = leftSlideMenu;
        vm.rightSlideMenu = rightSlideMenu;
        vm.shortcutMenuAdd = shortcutMenuAdd;
        vm.turnMenu = turnMenu;
        vm.nowtime = new Date();
        vm.noChildMenu = false;
        vm.currentMenuId = "";
        var setChildrenMenus = setChildrenMenus;
        var setCurrentUser = setCurrentUser;

        vm.changepwd = function () {
            ngDialog.open({
                title: '修改密码',
                template: "system/changepassword/changepwd.html",
                height: '250px',
                width: '500px',
                controller: 'ChangePwdCtrl',
                // controllerAs: 'changepwd',
                resolve: {
                    loadChangePwdFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './system/changepassword/changepwd.controller.js',
                            './system/changepassword/changepwd.service.js'
                        ]);
                    }
                }
            });
        }

        activate();

        /////////////////

        function activate() {
            coreService.getCurrentUser()
                .then(setCurrentUser);
            getShowMenus()
                .then(setShowMenus);
            getShortcutMenu()
                .then(setShortcutMenu)
                .then(function () {
                    $timeout(function () {
                        initHomeHtml();
                        rightSlide();
                    })
                })
                .then(activateOpenFirstOne);
        }

        function setCurrentUser(response) {
            vm.user = response.data;

        }

        function activateOpenFirstOne() {
            var oldActiveMenuInf = localStorageService.get("activeMenuInf");
            console.log(oldActiveMenuInf);
            if (oldActiveMenuInf) {
                vm.activeMenuInf = oldActiveMenuInf;
                getAndSetSecMenus(vm.activeMenuInf.firstMenu, true);
                getAndSetThhirdMenus(vm.activeMenuInf.secondMenu, null, true);
            }
        }

        function getShowMenus(id) {
            return homeService.loadChildAndSonMenuList(id);
        }

        function getShortcutMenu() {
            return homeService.loadShortcutMenuList();
        }

        function setShowMenus(response) {
            vm.menus = _.sortBy(response.data, function (item) {
                return parseInt(item.sortindex);
            });
            /*vm.menus = response.data;*/
        }

        function setShortcutMenu(response) {
            vm.shortcutMenuList = response.data;
        }


        function getAndSetSecMenus(menu, menuShow) {
            if (angular.isUndefined(menuShow)) {
                menu.childrenShow = !menu.childrenShow;
            } else {
                menu.childrenShow = menuShow;
            }
            vm.activeMenuInf.firstMenu = menu;
            _.forEach(vm.menus, function (item) {
                if (item.id === menu.id) {
                    item.childrenShow = menu.childrenShow;
                } else {
                    item.childrenShow = false;
                }
            });
        }

        function getAndSetChildrenMenus(menu) {
            /**如果已经展示载入了子菜单，则不需要再次载入**/
            var defer;
            if (menu.children === undefined) {
                defer = homeService.getShowMenus(menu.id, menu.son_type)
                    .then(function (response) {
                        menu.children = response.data;
                    });
            } else {
                defer = $q.defer();
                defer.resolve("success");
                defer = defer.promise;
            }
            return defer;

        }

        function getAndSetThhirdMenus(menu, $event, noLoadFirst) {
            if ($event) {
                $event.stopPropagation();//防止事件冒泡
            }
            vm.activeMenuInf.secondMenu = menu;
            getAndSetChildrenMenus(menu).then(function () {
                if (menu.children && menu.children.length > 0) {
                    vm.thirdMenus = menu.children;
                } else {
                    menu.children = [];
                    vm.thirdMenus = [menu];
                }
                if (vm.thirdMenus.length == 1) {
                    vm.noChildMenu = true;
                } else {
                    vm.noChildMenu = false;
                }
                if (!noLoadFirst) {
                    menuClick(vm.thirdMenus[0])
                }

            });

        }

        function setChildrenMenus(response) {
            var menu = response[0];
            var children = response.data;
            menu.children = children;
        }

        function menuClick(menu, event) {
            vm.activeMenuInf.thirdMenu = menu;

            localStorageService.set("activeMenuInf", vm.activeMenuInf);
            //menu.active = true;
            var params = {};
            if (menu.ui_params) {
                params = angular.fromJson(menu.ui_params)
            }
            $state.go(menu.ui_router_key, params);
        }

        function quit() {
            layer.confirm('确认退出系统吗?', {icon: 3, title: '操作确认'}, function () {
                loginService.loginOut()
                    .then(function () {
                        layer.closeAll('dialog');
                        $state.go("login");
                    });
            });
        }


        function rightSlideMenu() {
            vm.rightSlideFlag = !vm.rightSlideFlag;
            localStorageService.set("rightSlideFlag", vm.rightSlideFlag);
            rightSlide();
        }

        function rightSlide() {
            if (vm.rightSlideFlag) {
                vm.contentSlideOptions = {right: "0px"};
                vm.rightSlideOptions = {right: '-268px'};
            } else {
                vm.contentSlideOptions = {right: "268px"}
                vm.rightSlideOptions = {right: '15px'};
            }
        }

        function leftSlideMenu() {
            vm.leftSlideFlag = !vm.leftSlideFlag;
            leftSlide();
        }

        function leftSlide() {
            if (vm.leftSlideFlag) {
                vm.leftSideMenuUlOptions = {left: "0px"};
                vm.menuIconOptions = {left: "140px"};
                vm.leftSideMenuOptions = {width: "140px"};
                vm.contentRightSideOptions = {left: "140px"};
                vm.leftSlideOpName = "收起";

            } else {
                vm.leftSideMenuUlOptions = {left: "-140px"};
                vm.menuIconOptions = {left: "0px"};
                vm.leftSideMenuOptions = {width: "57px"};
                vm.contentRightSideOptions = {left: "57px"}
                vm.leftSlideOpName = "";
            }
        }

        function turnMenu(shortcutMenu) {
            menuClick(shortcutMenu);

        }

        function shortcutMenuAdd() {
            var checkedInf = [];
            if (vm.shortcutMenuList != null) {
                angular.forEach(vm.shortcutMenuList, function (data, index, arr) {
                    checkedInf.push({menuId: data.id, name: data.name});
                });
            }
            selectShortcutMenu(checkedInf, setShortcutMenuList)
        }

        function setShortcutMenuList() {
            getShortcutMenu()
                .then(setShortcutMenu);
        }

        function selectShortcutMenu(checkedInf, selectShortcutMenuCallBack) {
            ngDialog.open({
                title: '设置快捷菜单',
                template: "home/shortcutMenuSelect/shortcutMenuSelect.html",
                height: '500px',
                width: '700px',
                controller: 'ShortcutMenuSelectCtrl',
                data: {
                    zTreeSettingParams: {
                        multiple: true,
                        checkedInf: checkedInf
                    }
                },
                resolve: {
                    loadShortcutMenuSelectFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './home/shortcutMenuSelect/shortcutMenuSelect.controller.js',
                            './home/shortcutMenuSelect/shortcutMenuSelect.service.js',
                            'ng-zTree',
                            'mCustomScrollbar'
                        ]);
                    }
                },
                preCloseCallback: selectShortcutMenuCallBack
            });
        }


    }
})();
