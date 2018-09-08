/**
 * repeat后执行完成后操作方法
 * Created by cr
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('repeatDone', repeatDone);

    repeatDone.$inject = ['$','$timeout'];

    /* @ngInject */
    function repeatDone($, $timeout) {
        var directive = {
            link: link,
            restrict: 'EA'

        };
        return directive;

        function link(scope,element,attr) {
            if(scope.$last){
                $timeout(function(){
                    scope.$eval(attr.repeatDone)
                },200);
            }
        }
    }

})();