/**
 * 时间插件
 * Created by pancuican@1193 on 2017/6/19.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ngDate', ngDate);

    ngDate.$inject = ['$parse','$timeout'];

    /* @ngInject */
    function ngDate($parse,$timeout) {
        var directive = {
            link: link,
            restrict: 'EA',
            require:'?ngModel'
        };
        return directive;

        function link($scope,$element, $attr, ngModel){
            var dateFmt = $attr["ngDate"] || "yyyy-MM-dd";
            var maxDate = $attr["maxDate"] || "";
            var minDate = $attr["minDate"] || "";
            var disabledDates = eval($attr["disabledDates"]) || [];
            function picked(){
                var getter = $parse($attr["ngModel"]);

                getter.assign($scope,$element.val());
            }
            var el = $attr["id"];
            if(!el) el = ("ele_"+Math.random()).replace(".");
            $element.attr("readonly",true);
            $element.attr("id",el);
            $element.on('click',function(){
                WdatePicker({
                    el:el,
                    dateFmt:dateFmt,
                    maxDate:maxDate,
                    minDate:minDate,
                    onpicked:picked,
                    disabledDates:disabledDates
                });
            });
            $element.focusout(function () {
                $timeout(function () {
                    var getter = $parse($attr["ngModel"]);
                    getter.assign($scope,$element.val());
                },100);
            });
        }
    }

})();

