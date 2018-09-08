/**
 * Created by tr on 2018年8月7日10:26:41
 */
(function () {
    'use strict';
    angular
        .module('app.mp')
        .controller('MpDetailCtrl', MpDetailCtrl);

    MpDetailCtrl.$inject = ['$state','$scope', 'ngDialog', 'SYSTEM', 'mpDetailService','localStorageService','coreService']; // 初始化
    function MpDetailCtrl($state, $scope, ngDialog, SYSTEM, mpDetailService,localStorageService,coreService) {
        var vm = this;




    }

})();