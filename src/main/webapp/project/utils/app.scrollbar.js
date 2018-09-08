/**
 * Created by pancuican@1193 on 2017/11/9.
 */
//滚动条
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('mCustomScrollbar', mCustomScrollbar);

    mCustomScrollbar.$inject = ['$'];

    /* @ngInject */
    function mCustomScrollbar($) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch(attrs.mCustomScrollbar, function (value){
                var options = angular.extend({horizontalScroll:false},value);
                $(element).mCustomScrollbar(options);
            });
        }
    }

})();