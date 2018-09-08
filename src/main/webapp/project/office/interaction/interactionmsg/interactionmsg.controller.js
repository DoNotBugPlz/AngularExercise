/**
 * @author maxzhao
 * @time 2018/08/15.
 */
(function () {
    'use strict';
    angular
        .module('app.office')
        .controller('InteractionmsgCtrl', InteractionmsgCtrl);
    InteractionmsgCtrl.$inject = ['$scope', '$stateParams', 'interactionmsgService', 'pageInfDefault', 'ngDialog', '$window'];

    /* @ngInject */
    function InteractionmsgCtrl($scope, $stateParams, interactionmsgService, pageInfDefault, ngDialog, $window) {
        var vm = this;
        vm.title = 'InteractionmsgCtrl';

    }

})();

