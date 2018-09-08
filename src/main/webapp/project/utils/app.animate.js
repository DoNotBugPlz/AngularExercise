/**
 * 指令，使用jquery实现slide
 * Created by pancuican@1193 on 2017/6/5.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('jquerySlide', jquerySlide)
        .directive('jqueryAnimation', jqueryAnimation);
    jquerySlide.$inject = ['$'];
    function jquerySlide($) {
        var jquerySlide = {
            link: link,
            restrict: 'EA',
            scope: {
                jquerySlide:'='
            }
        };
        return jquerySlide;
        function link(scope, element, attrs) {
            scope.$watch('jquerySlide', function (value,oldValue){
                if(!angular.isUndefined(value)){
                    if(value){
                        $(element).slideDown(attrs.speed || "normal",function(){
                            scope.$eval(attrs.oncomplete || '');
                        });
                    }else{
                        $(element).slideUp(attrs.speed || "normal",function(){
                            scope.$eval(attrs.oncomplete || '');
                        });
                    }
                }
            });
        }
    }
    jqueryAnimation.$inject = ['$'];

    /* @ngInject */
    function jqueryAnimation($) {
        var jqueryAnimation = {
            link: link,
            restrict: 'EA',
            scope: {
                jqueryAnimation:'=',
                show:'='
            }
        };
        return jqueryAnimation;

        function link(scope, element, attrs) {
            scope.$watch('jqueryAnimation', function ngJqueryAnimateWatchAction(value){
                if(!angular.isUndefined(value)){
                    $(element).stop(true,true);
                    if(scope.show===true && (!angular.isUndefined(scope.show))){
                        $(element).show();
                    }
                    if((!angular.isUndefined(value['height'])) || (!angular.isUndefined(value['width']))){
                        value['height'] = value['height'] === 'count'?$(element).height():value['height'];
                        value['width'] = value['width'] === 'count'?$(element).width():value['width'];
                    }
                    $(element).animate(value,attrs.speed || "normal",function(){
                        scope.$eval(attrs.oncomplete || '');
                        if(scope.show===false && (!angular.isUndefined(scope.show))){
                            $(element).hide();
                        }
                    });
                }
            });
        }
    }

})();





