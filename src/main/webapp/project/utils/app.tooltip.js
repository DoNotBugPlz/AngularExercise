/**
 * 配合jquery.ui.js
 * 提示窗
 * Created by pancuican@1193 on 2017/11/1.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ngTooltip', ngTooltip);

    ngTooltip.$inject = ['$', '_'];

    /* @ngInject */
    function ngTooltip($, _) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                "ngTooltip":"=",
                "ngModel":"=",
                'list':"="
            }
        };
        return directive;

        function link(scope, element, attrs) {
            var options = {
                position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: function( position, feedback ) {
                        $( this ).css( position );
                        $("<div>")
                            .addClass( "arrow" )
                            .addClass( feedback.vertical )
                            .addClass( feedback.horizontal )
                            .appendTo( this );
                    }
                }
            };

            scope.$watch('ngTooltip',function(current){
                if(current && current!==scope.ngModel && scope.ngModel!==undefined){
                    var ngOptions = attrs.ngOptions;
                    var title;
                    if(!angular.isUndefined(ngOptions)){
                        /**根据ngoptions获得参数**/
                        var listName = ngOptions.substring(ngOptions.indexOf("in ")+2).replace(/ /g,"");
                        var valueName = ngOptions.substring(0,ngOptions.indexOf("as ")).replace(/ /g,"").split(".")[1];
                        var keyName = ngOptions.substring(ngOptions.indexOf("as ")+2,ngOptions.indexOf("for ")).replace(/ /g,"").split(".")[1];
                        var list = listName.split(".");
                        list = scope.$parent[list[0]][list[1]];
                        var selectObj = _.find(list,function(item){
                             return item[valueName]===current;
                        });
                        title = selectObj[keyName];
                    }else{
                        title = current;
                    }
                    $(element).attr('title',"申请修改为："+title);
                    $(element).addClass("warning");
                    $(element).tooltip(options);
                }
            });
        }
    }


})();


