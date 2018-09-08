/**
 * 变量赋值为dom标签
 * Created by pancuican@1193 on 2017/6/8.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('htmlContent', htmlContent);

    htmlContent.$inject=['$sce'];

    function htmlContent($sce) {
        return htmlContentFilter;

        ////////////////

        function htmlContentFilter(input) {
            if(!angular.isUndefined(input)){
                return $sce.trustAsHtml(input);
            }else{
                return '';
            }

        }
    }

})();

