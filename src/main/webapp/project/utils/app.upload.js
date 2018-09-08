/**
 * Created by pancuican@1193 on 2017/11/3.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('uploadFile', uploadService);

    uploadService.$inject = ['$', 'localStorageService'];

    /* @ngInject */
    function uploadService($, localStorageService) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope:{
                "uploadFile": "="
            }
        };
        return directive;

        function link(scope, element, attrs) {
          /*  scope.$watch('uploadFile',function(current){
               scope.updateFile = current;
            });
*/
            $(element).css({"position":"relative"});
            $(element).find("form").css({"position":"absolute","top":"0px","left":"0px","width":"100%","height":"100%"});
            $(element).find("input:file").css({"position":"absolute","top":"0px","left":"0px","width":"100%","height":"100%","opacity":"0","filter":"alpha(opacity=0)","cursor":"pointer"});
            $(element).find("input:file").off('change').on('change',function(){
                var option = angular.extend({},scope.uploadFile);
                var customBeforeSend;
                if(!angular.isUndefined(option['beforeSend'])) {
                    customBeforeSend = option['beforeSend'];
                }
                option['beforeSend'] = function(request){
                    if(!angular.isUndefined(customBeforeSend)){
                        customBeforeSend();
                    }
                    request.setRequestHeader("x_auth_token",localStorageService.get("x_auth_token"));
                };
                var xhr = $(element).find("form").ajaxSubmit(option).data("jqxhr");
                if(typeof xhr === "object" && xhr.then){
                    xhr.then(function(response){
                        $(element).find("input:file").val("");
                        if(!angular.isUndefined(option.callback)){
                            option.callback(response);
                        }
                    });
                }
            });
        }
    }

    ControllerName.$inject = ['$'];

    /* @ngInject */
    function ControllerName($) {

    }

})();


