/**
 * @author maxzhao
 * @time 2018/08/17.
 */
(function () {
    'use strict';
    angular
        .module('app.staffstatistics')
        .controller('StaffStatisticsCtrl', StaffStatisticsCtrl);
    StaffStatisticsCtrl.$inject = ['$scope'];

    /* @ngInject */
    function StaffStatisticsCtrl($scope) {
        var vm = this;
        window.a = vm;
        vm.title = "StaffStatisticsCtrl";
    }

})();

