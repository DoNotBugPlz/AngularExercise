/**
 * 分页插件
 * Created by pancuican@1193 on 2017/6/6.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .constant("pageInfDefault", {
            pageNumberDefault:1,
            pageSizeDefault:10
        })
        .directive('ngTurnPage', ngTurnPageDirective);

    ngTurnPageDirective.$inject = ['$', '$compile'];
    var getHtml = getHtml;

    /* @ngInject */
    function ngTurnPageDirective($, $compile) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                ngTurnPage: "=",
                turnPageFn: "="
            }

        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch('ngTurnPage', function ngTurnPageWatchAction(value) {
                var defaults = {
                    total: 0,
                    pagesize: 10,
                    pagenum: 1,
                    pagecount: 1,
                    limitpage: 5,
                    pageTurn: "",
                    hideTotal: false
                };
                var options = angular.extend({}, defaults, value);
                /*$(element).addClass("Pagination").attr("totalcount",options.totalcount);*/
                $(element).addClass("turnPages").attr("total", options.total);
                $(element).attr("pagesize", options.pagesize).attr("pagenum", options.pagenum);
                var html = getHtml(options);
                $(element).empty().append(html);
                $compile(element.children())(scope);
            });
        }
    }


    function getHtml(options) {
        var page = $("<div></div>");
        var ul = $("<ul></ul>");
        ul.appendTo(page);

        options.pagecount = parseInt((parseInt(options.total) + parseInt(options.pagesize) - 1) / options.pagesize);
        if (options.pagenum < 1) {
            options.pagenum = 1;
        } else if (options.pagenum > options.pagecount) {
            options.pagenum = options.pagecount
        }

        if (!options.hideTotal) {
            page.append('<div class="total">共<span> ' + options.total + ' </span>条记录</div>');
        }
        var page_last = $("<li class='page_next'><span>末页</span></li>");
        var page_last_none = $("<li class='page_none'><span>末页</span></li>");

        var page_next = $("<li class='page_next'><span>下一页</span></li>");
        var page_next_none = $("<li class='page_none'><span>下一页</span></li>");

        if (options.pagenum < options.pagecount) {
            //page_next.attr("ng-click",options.pageTurn + "("+(parseInt(options.pagenum) + 1)+","+options.pagesize+")");
            page_next.attr("ng-click", "turnPageFn(" + (parseInt(options.pagenum) + 1) + "," + options.pagesize + ")");
            page_last.attr("ng-click", "turnPageFn(" + options.pagecount + "," + options.pagesize + ")");
            page_last.appendTo(ul);
            page_next.appendTo(ul);
        } else {
            page_last_none.appendTo(ul);
            page_next_none.appendTo(ul);
        }

        /** 生成li代码 **/
        function getLiHTML(num) {
            var li = $("<li ><span></span></li>");
            //li.attr("ng-click",options.pageTurn + "("+num+","+options.pagesize+")");
            li.attr("ng-click", "turnPageFn(" + num + "," + options.pagesize + ")");
            $("span", li).append(num);
            return li;
        }

        var limit = Math.floor(options.limitpage / 2);
        var _max = Math.min(parseInt(options.pagenum) + limit, parseInt(options.pagecount));
        _max = Math.max(Math.min(parseInt(options.limitpage), parseInt(options.pagecount)), _max);
        for (var i = 0; i < parseInt(options.limitpage) && _max - i >= 1; i++) {
            var li = getLiHTML(_max - i);
            if ((_max - i) === options.pagenum) {
                li.addClass("active");
            }
            li.appendTo(ul);
        }

        var page_prev = $("<li class='page_prev'><span>上一页</span></li>");
        var page_prev_none = $("<li class='page_none'><span>上一页</span></li>");
        var page_first = $("<li class='page_prev'><span>首页</span></li>");
        var page_first_none = $("<li class='page_none'><span>首页</span></li>");
        if (options.pagenum > 1) {
            /*page_prev.attr("ng-click",options.pageTurn + "("+(parseInt(options.pagenum) - 1)+","+options.pagesize+")");*/
            page_prev.attr("ng-click", "turnPageFn(" + (parseInt(options.pagenum) - 1) + "," + options.pagesize + ")");
            page_first.attr("ng-click", "turnPageFn(" + 1 + "," + options.pagesize + ")");
            page_prev.appendTo(ul);
            page_first.appendTo(ul);
        } else {
            page_prev_none.appendTo(ul);
            page_first_none.appendTo(ul);
        }

        return page.html();
    }

})();

