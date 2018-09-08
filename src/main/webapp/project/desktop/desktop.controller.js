/**
 * Created by pancuican@1193 on 2017/9/27.
 */
(function () {
    'use strict';

    angular
        .module('app.desktop')
        .controller('DesktopCtrl', DesktopCtrl);

    DesktopCtrl.$inject = ['$scope'];

    /* @ngInject */
    function DesktopCtrl($scope) {
        var vm = this;
        vm.title = 'DesktopCtrl';

        activate();

        ////////////////

        function activate() {

        }
    }

})();

