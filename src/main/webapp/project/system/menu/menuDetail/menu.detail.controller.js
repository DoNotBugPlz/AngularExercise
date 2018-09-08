(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuDetailCtrl', MenuDetailCtrl);

    MenuDetailCtrl.$inject = ['$scope','$stateParams','menuDetailService','coreService'];

    /* @ngInject */
    function MenuDetailCtrl($scope,$stateParams,menuDetailService,coreService) {

        var vm =this;
        vm.menu = {};
        vm.menu_ext = {};
        var menuId = $stateParams.menuId;
        var parentMenuId = $stateParams.parentMenuId;
        var zTreeRefreshMenuId = $stateParams.zTreeRefreshMenuId;
        if(parentMenuId){
            vm.menu.parentid = parentMenuId;
        }
        var loadMenuInf = loadMenuInf;
        vm.saveMenuInf = saveMenuInf;
        activate();
        function activate() {
            coreService.getCategoryValues("YESNO,MENU_URL_TYPE")
                .then(setCategoryValues)
                .then(loadMenuInf)
        }
        function setCategoryValues(response) {
            var result = response.data;
            vm.yesnoCatagory= coreService.covertCategoryValueIdToInt(result["YESNO"]);
            vm.menuUrlTypeCatagory= coreService.covertCategoryValueIdToInt(result["MENU_URL_TYPE"]);
            vm.menu.delstatus=0;
            vm.menu_ext.menu_url_type=1;
        }

        function loadMenuInf() {
            if(!angular.isUndefined(menuId)&&menuId!='null'&&menuId!=''){
                var params = {id:menuId};
                menuDetailService.loadMenuInf(params)
                    .then(setMenuInf);
            }
        }
        function setMenuInf(response) {
            var result = response.data;
            vm.menu = result.menu;
            vm.menu_ext = result.menu_ext;
        }
        function saveMenuInf(){
            if ($scope.menu_form.$valid) {
                var params = {};
                params["sys_menu"]=vm.menu;
                params["sys_menu_ext"]=vm.menu_ext;
                menuDetailService.saveMenu(params)
                    .then(saveMenuInfSuccess)
            }else{
                AppTools.errorTips("请完善信息！");
            }
        }
        function saveMenuInfSuccess(response) {
            vm.menu = response.data;
            AppTools.successTips("保存成功！");
            $scope.$emit("menuZTreeRefreshEvent",zTreeRefreshMenuId);
        }
    }
})();

