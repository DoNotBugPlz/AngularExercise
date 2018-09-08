/**
 * Created by yzr on 2018/08/16.
 */
(function (rootPath) {
    'use strict';
    angular
        .module('app.core')
        .directive("imgSrcDiv", imgSrcDivDirective);
    imgSrcDivDirective.$inject = [];
    /* @ngInject */
    function imgSrcDivDirective() {
        var directive = {
            restrict: 'EA',
            link: link,
            scope: {
                "imgSrcParams": "="
            }
        };

        function link(scope, element, attrs) {
            scope.$watch('imgSrcParams', function (value) {
                if (value) {
                    var img = "<img src=\"" + attrs.imgSrcBegin + value + "\"  class='img_top'>";
                    element.empty().append(img);
                }
            }, true);
        }

        return directive;

    }


})("../");


