/**
 * 焦点事件（配合实现表单验证）
 * Created by pancuican@1193 on 2017/6/19.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ngFocus', ngFocus);

    /* @ngInject */
    function ngFocus() {
        var FOCUS_CLASS = "ng-focused";
        var directive = {
            link: link,
            restrict: 'EA',
            require: 'ngModel'
        };
        return directive;

        function link($scope, $element, $attr, $ctrl) {
            $ctrl.$focused = true;
            var errorMsg = ($attr.errmsg || '') ? "(" + ($attr.errmsg || '') + ")" : "";
            $element.bind('focus', function (evt) {
                $element.addClass(FOCUS_CLASS);
                $element.val($element.val().replace(errorMsg, ""));
                $element.removeClass("errSty");
                $scope.$apply(function () {
                    $ctrl.$focused = true;
                });
            }).bind('blur', function (evt) {
                $element.removeClass(FOCUS_CLASS);
                if (!$ctrl.$valid) {
                    if (!$element.hasClass("errSty")) {
                        $element.val($element.val() + errorMsg);
                        $element.addClass("errSty");
                    }
                } else {
                    $element.removeClass("errSty");
                }
                if ($scope.$$phase) {
                    $ctrl.$focused = false;
                } else {
                    $scope.$apply(function () {
                        $ctrl.$focused = false;
                    });
                }
            });

            var validate = validate;
            $scope.$on('inputValidate', validate);

            ///////////////////////

            function validate() {
                $($element).blur();
            }


        }
    }

})();

