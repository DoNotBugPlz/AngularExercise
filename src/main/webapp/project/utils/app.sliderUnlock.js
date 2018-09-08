/**
 * 滑动插件
 * Created by cr
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ngSliderUnlock', ngSliderUnlock);

    ngSliderUnlock.$inject = ['$','$compile'];

    /* @ngInject */
    function ngSliderUnlock($, $compile) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope:{
                ngSliderUnlock:'='
            }
        };
        return directive;

        function link(scope,element,attr) {
            var idName = attr.id;
            $("#"+ idName).slider({
                width: 264,
                height: 44,
                // sliderBg:"rgb(22, 208, 168)",
                bgColor: "#16d0a8",
                callback: function (result) {
                    scope.ngSliderUnlock = result;
                    scope.$apply();
                }
            });
        }
    }

})();