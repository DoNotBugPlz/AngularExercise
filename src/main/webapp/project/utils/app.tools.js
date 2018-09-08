/**
 * Created by pancuican@1193 on 2017/10/12.
 */
(function () {
    'use strict';
    window["AppTools"]= {
        clientWidth : $(document).width(),
        clientHeight  : $(document).height()
    };
    //信息提示
    AppTools.infoTips=function (message) {
        toastr.info(message);
    };
    //失败提示
    AppTools.errorTips=function (message) {
        toastr.error(message);
    };
    //成功提示
    AppTools.successTips=function (message) {
        toastr.success(message);
    };
    AppTools.confirm=function (message,callback) {
        layer.confirm(message,{icon:3,title:'操作确认'},function (){
            callback();
            layer.closeAll('dialog');
        });
    };
    AppTools.showLoading=function () {
        layer.load(1);
    };
    AppTools.hideLoading=function () {
        layer.closeAll('loading');
    };
    AppTools.Request = function (key) {
        var retValue = (window.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
        return (retValue == null ? "" : retValue);
    };
    //打开weboffice
    AppTools.opWebOffice = function (ngDialog,title,params,callBack) {
        ngDialog.open({
            title: title,
            template:"weboffice/weboffice.html",
            height:AppTools.clientHeight*0.9 +'px',
            width:AppTools.clientWidth*0.9 +'px',
            controller:'webOfficeCtrl as vm',
            data:params,
            resolve: {
                loadWebOfficeFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        './weboffice/weboffice.controller.js',
                        './weboffice/weboffice.directive.js',
                        './weboffice/weboffice.service.js'
                    ]);
                }
            },
            preCloseCallback:callBack
        });
    }

})();
//一个jquery的插件，用于监听元素宽度高度变化，调用方式：
//$("classname").bind('resize',function(){
//callback
//});
(function ($, window, undefined) {
    var elems = $([]),
        jq_resize = $.resize = $.extend($.resize, {}),
        timeout_id,
        str_setTimeout = 'setTimeout',
        str_resize = 'resize',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';
    jq_resize[str_delay] = 250;
    jq_resize[str_throttle] = true;
    $.event.special[str_resize] = {
        setup: function () {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var elem = $(this);
            elems = elems.add(elem);
            $.data(this, str_data, {
                w: elem.width(),
                h: elem.height()
            });
            if (elems.length === 1) {
                loopy();
            }
        },
        teardown: function () {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var elem = $(this);
            elems = elems.not(elem);
            elem.removeData(str_data);
            if (!elems.length) {
                clearTimeout(timeout_id);
            }
        },
        add: function (handleObj) {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var old_handler;

            function new_handler(e, w, h) {
                var elem = $(this),
                    data = $.data(this, str_data);
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();
                old_handler.apply(this, arguments);
            }

            if ($.isFunction(handleObj)) {
                old_handler = handleObj;
                return new_handler;
            } else {
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }
    };

    function loopy() {
        timeout_id = window[str_setTimeout](function () {
            elems.each(function () {
                var elem = $(this),
                    width = elem.width(),
                    height = elem.height(),
                    data = $.data(this, str_data);
                if (width !== data.w || height !== data.h) {
                    elem.trigger(str_resize, [data.w = width, data.h = height]);
                }
            });
            loopy();
        }, jq_resize[str_delay]);
    }
})(jQuery, this);
//避免console ie报错
(function() {
    var method;
    var empty = window.$ ? $.noop : function(){};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = empty;
        }
    }
}());
