/**
 * Created by yzr on 2018/08/16.
 */
(function (rootPath) {
    'use strict';
    angular
        .module('app.core')
        .directive("ngCheckboxSelect", ngCheckboxSelectDirective);
    ngCheckboxSelectDirective.$inject = ['$compile','_'];
    /* @ngInject */
    function ngCheckboxSelectDirective($compile,_) {
        var directive = {
            restrict: 'EA',
            link: link,
            controller: function ($scope) {
                var vm = this;
                vm.selItem = function(n,multiple){
                    if(!$scope.ngDisabled){
                        if(multiple){
                            var ngCheckBox ="";
                            if(angular.isUndefined($scope.ngModel)){
                                ngCheckBox="";
                            }else{
                                ngCheckBox=","+$scope.ngModel+",";
                            }

                            var temp = ","+n.id+",";
                            if(ngCheckBox.indexOf(temp)>-1){
                                ngCheckBox = ngCheckBox.replace(temp,",");
                            }else{
                                ngCheckBox= ngCheckBox+temp;
                            }
                            $scope.ngModel = _.filter(ngCheckBox.split(","),function (e) {
                                return e!="";
                            }).join(",");
                        }else{
                            $scope.ngModel = n.id;
                        }
                    }
                }
            },
            controllerAs: "vm",
            scope: {
                "ngCheckboxSelect": "=",
                "ngModel": "=",
                "ngDisabled": "=",
                "multiple":"="
            },

        };

        function link(scope, element, attrs) {
            var multiple = false;
            if(angular.isUndefined(attrs.multiple)||attrs.multiple=="false"){
                multiple = false;
            } else {
                multiple = true;
            }
            var ngHtml = "<span style=\"white-space:nowrap;cursor: pointer\" ng-repeat=\"n in ngCheckboxSelect track by $index\" ng-click=\"vm.selItem(n,"+multiple+")\">\n" +
                "                             <a class=\"ipt_check\" ng-class=\"{true:'checked',false:''}[ (','+ngModel+',').indexOf(','+n.id+',')>-1 ]\"></a>\n" +
                "                             &nbsp;{{n.chinaname}}&nbsp;\n" +
                "                         </span>";
            element.empty().append(ngHtml);
            $compile(element.children())(scope);
        }

        return directive;

    }


})("../");


