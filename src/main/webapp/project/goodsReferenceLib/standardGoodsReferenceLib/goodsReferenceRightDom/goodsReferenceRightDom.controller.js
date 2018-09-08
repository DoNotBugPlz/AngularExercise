(function () {
    'use strict';

    angular
        .module('app.goodsReferenceLib')
        .controller('GoodsReferenceRightDomCtrl', GoodsReferenceRightDomCtrl);

    GoodsReferenceRightDomCtrl.$inject = ['$scope','$stateParams','pageInfDefault','goodsReferenceLibRightDomService','coreService','$q','ngDialog'];

    /* @ngInject */
    function GoodsReferenceRightDomCtrl($scope,$stateParams,pageInfDefault,goodsReferenceLibRightDomService,coreService,$q,ngDialog) {
        var vm =this;

        activate();
        function activate() {


        }





    }
})();

