/**
 * Created by pancuican@1193 on 2017/10/23.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ngNavigation', ngNavigation);
    /*.directive('ngNavigationChildren',ngNavigationChildren);*/

    ngNavigation.$inject = ['_', '$'];

    /* @ngInject */
    function ngNavigation(_, $) {
        var directive = {
            link: link,
            restrict: 'EA',
            template: getTemplate,
            scope: {
                'navigations': '='
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }

        function getTemplate(element, attrs) {
            var html =
                '   <div ng-repeat="menu in navigations">' +
                '       <div class="menu_father" ng-cloak>{{menu.menu_name || menu.module_name}}</div>' +
                '       <div ng-show="menu.show" ></div>' +
                '   </div>';
            return html;
        }
    }

})();

