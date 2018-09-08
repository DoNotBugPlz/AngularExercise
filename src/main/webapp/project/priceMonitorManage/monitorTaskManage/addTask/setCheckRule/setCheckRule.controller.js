
(function () {
    'use strict';
    angular
        .module('app.monitorTaskManage')
        .controller('SetCheckRuleController', SetCheckRuleController);
    SetCheckRuleController.$inject = ['$scope', 'coreService','setCheckRuleService','pageInfDefault', 'ngDialog', '_','$state'];

    /* @ngInject */
    function SetCheckRuleController($scope, coreService,setCheckRuleService,pageInfDefault, ngDialog, _,$state) {
        var vm = this;
        window.a = vm;





        activate();
        function activate() {
            coreService.getCategoryValues('GOODS_FAMILY,LEVELTYPE2,TASKCYCLE,TASKSTATUS,TASKCLASSES')
                .then(setCategoryValues);
        }
        function setCategoryValues(response) {
            var result = response.data;
            vm.goods_family= coreService.covertCategoryValueIdToInt(result["GOODS_FAMILY"]);
            vm.task_level= coreService.covertCategoryValueIdToInt(result["LEVELTYPE2"]);
            vm.task_cycle= coreService.covertCategoryValueIdToInt(result["TASKCYCLE"]);
            vm.task_status= coreService.covertCategoryValueIdToInt(result["TASKSTATUS"]);
            vm.task_classes= coreService.covertCategoryValueIdToInt(result["TASKCLASSES"]);

        }





    }


})();

