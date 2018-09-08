/**
 * Created by pancuican@1193 on 2017/10/12.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ngChosenOption', ngChosenOptionDefault)
        .directive('ngChosen', ngChosen);

    ngChosenOptionDefault.$inject = ['$'];
    function ngChosenOptionDefault($) {
        var directive = {
            replace:true,
            restrict: 'EA',
            scope:false,
            template:template
        };
        return directive;
        function template() {
            return "<option value=\"\">==请选择==</option>";
        }
    }
    ngChosen.$inject = ['$'];
    /* @ngInject */
    function ngChosen($) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope:{
                'ngModel':'=',
                'ngChosenData':'=',
                'chosenListRefresh':'='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            var options = {};
            $(element).addClass("chosen-select");
            if(angular.isUndefined(attrs.dataPlaceholder)){
                 $(element).attr('data-placeholder', '==请选择==');
            }
            if(!angular.isUndefined(attrs.ngChosen) && ( attrs.ngChosen !== '')){
                 options = angular.fromJson(attrs.ngChosen);
            }
            if(angular.isUndefined(options.width)){
                options.width = '99.9%';

            }
            $(element).chosen(options);

            scope.$watch('ngModel',function(value,prev){
                if(value!==prev){
                     $(element).trigger('chosen:updated');
                }
            });
            scope.$watch('ngChosenData',function(value,prev){
                if(value){
                    $(element).trigger('chosen:updated');
                }
            });

            scope.$watch('chosenListRefresh',function(value,prev){
                 if(value){
                    $(element).empty();
                    $(element).trigger("chosen:updated");
                    scope.chosenListRefresh = false;
                 }
            });

        }
    }
})();

