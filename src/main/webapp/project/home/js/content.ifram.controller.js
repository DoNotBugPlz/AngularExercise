/**
 * 框架首页
 */

(function (rootPath) {
    'use strict';
    angular.module('app.home')
        .controller("ContentIframCtrl", ContentIframCtrl);

    ContentIframCtrl.$inject = ['$stateParams'];

    function ContentIframCtrl($stateParams) {

        var vm = this;
        vm.iframSrc = rootPath+$stateParams.iframSrc;

    }
})("../");
