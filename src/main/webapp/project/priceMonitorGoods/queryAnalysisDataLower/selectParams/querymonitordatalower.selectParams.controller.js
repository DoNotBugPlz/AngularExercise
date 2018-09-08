/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function () {
    'use strict';

    angular
        .module('app.querymonitordatalower')
        .controller('QuerymonitordatalowerSelectParamsCtrl', QuerymonitordatalowerSelectParamsCtrl);
    QuerymonitordatalowerSelectParamsCtrl.$inject = ['$scope', 'querymonitordatalowerSelectParamsService', 'pageInfDefault', 'ngDialog', '$sce', '$q', '_', '$window'];

    /* @ngInject */
    function QuerymonitordatalowerSelectParamsCtrl($scope, querymonitordatalowerSelectParamsService, pageInfDefault, ngDialog, $sce, $q, _, $window) {
        var sp = this;
        window.sp = sp;

        function active() {

        }

        active();
    }
})();
