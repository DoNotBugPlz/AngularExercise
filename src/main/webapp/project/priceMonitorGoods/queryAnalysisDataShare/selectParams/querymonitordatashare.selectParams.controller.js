/**
 * @author maxzhao
* @time 2018/09/05.
 */
(function () {
    'use strict';

    angular
        .module('app.querymonitordatashare')
        .controller('QuerymonitordatashareSelectParamsCtrl', QuerymonitordatashareSelectParamsCtrl);
    QuerymonitordatashareSelectParamsCtrl.$inject = ['$scope', 'querymonitordatashareSelectParamsService', 'pageInfDefault', 'ngDialog', '$sce', '$q', '_', '$window'];

    /* @ngInject */
    function QuerymonitordatashareSelectParamsCtrl($scope, querymonitordatashareSelectParamsService, pageInfDefault, ngDialog, $sce, $q, _, $window) {
        var sp = this;
        window.sp = sp;

        function active() {

        }

        active();
    }
})();
