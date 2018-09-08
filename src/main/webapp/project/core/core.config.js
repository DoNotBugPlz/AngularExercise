(function (rootPath) {
    'use strict';

    var browserMatch = getBrowserMatch();

    angular
        .module('app.core')
        .config(config)
        .constant("_",window._)
        .constant("$", window.$)
        .constant('toastr', window.toastr)
        .constant('SYSTEM', {
            browserMatch:browserMatch,//浏览器型号版本、32或64位
            RequestParamType:"RequestParam",
            VALIDATE_RULES:{
                // 正则验证表达式
                IntegerValidReg: /^-?(0|([1-9]\d*))$/  // 整数
            },
            FineURL: 'http://32.1.0.33:37799/WebReport/ReportServer',
            FineLoginParams: {
                op: 'api',
                cmd: 'bi_login',
                bi_username: 'sky',
                bi_password: 'sky',
                callback: 'login_msg'
            }
        });

    config.$inject = ['$ocLazyLoadProvider', 'localStorageServiceProvider', 'toastr'];

    /* @ngInject */
    function config($ocLazyLoadProvider, localStorageServiceProvider, toastr) {
        $ocLazyLoadProvider.config({
            modules: [{//自定义滚动条
                name:'mCustomScrollbar',
                files:[
                    "./utils/app.scrollbar.js",
                    './lib/mCustomScrollbar/jquery.mCustomScrollbar.min.js',
                    './lib/mCustomScrollbar/jquery.mCustomScrollbar2.css'
                ]
            },{//自定义上传
                name:'customUpload',
                files:[
                    './lib/jquery/form/jquery.form.js',
                    './utils/app.upload.js'
                ]
            },{//翻页
                name:'pagination',
                files:[
                    './utils/app.pagination/app.pagination.js',
                    './utils/app.pagination/app.pagination.css'
                ]
            },{//chosen.js
                name:'chosen',
                files:[
                    './lib/chosen/chosen.jquery.js',
                    './lib/chosen/chosen.bootstrap.css',
                    './utils/app.select.js'
                ]
            },{
                name:'My97DatePicker',
                files:[
                    './lib/My97DatePicker/WdatePicker.js',
                    './lib/My97DatePicker/lang/zh-cn.js',
                    './utils/app.datepicker.js'
                ]
            },{
                name:'ng-zTree',
                files:[
                    './utils/app.ztree.js',
                    './lib/ztree/css/zTreeStyle/zTreeStyle.css',
                    './lib/ztree/js/jquery.ztree.all.js'
                ]
            },{
                name:'sliderUnlock',
                files:[
                    './utils/app.sliderUnlock.js',
                    './lib/sliderUnlock/css/jquery.slider.css',
                    './lib/sliderUnlock/js/jquery.slider.min.js'
                ]
            },{
                name:'JsBarcode',
                files:[
                    './utils/app.repeatDone.js',
                    './lib/JsBarcode/JsBarcode.all.min.js'
                ]
            }]
        });

        toastr.options = {
            "closeButton": true,
            "positionClass": 'toast-bottom-right'
        };

        localStorageServiceProvider
            .setPrefix('app')
            .setStorageType('sessionStorage')
            .setNotify(true, true);
    }


    //获取浏览器信息
    function getBrowserMatch() {
        // 请勿修改，否则可能出错
        var userAgent = navigator.userAgent,
            rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/;
        var browser;
        var version;
        var ua = userAgent.toLowerCase();
        function uaMatch(ua) {
            var match = rMsie.exec(ua);
            if (match != null) {
                return { browser: "IE", version: match[2] || "0" };
            }
            var match = rFirefox.exec(ua);
            if (match != null) {
                return { browser: match[1] || "firefox", version: match[2] || "0" };
            }
            var match = rOpera.exec(ua);
            if (match != null) {
                return { browser: match[1] || "", version: match[2] || "0" };
            }
            var match = rChrome.exec(ua);
            if (match != null) {
                return { browser: match[1] || "chrome", version: match[2] || "0" };
            }
            var match = rSafari.exec(ua);
            if (match != null) {
                return { browser: match[2] || "", version: match[1] || "0" };
            }
            if (match != null) {
                return { browser: "", version: "0" };
            }
        }
        var browserMatch = uaMatch(userAgent.toLowerCase());
        browserMatch.platform = navigator.platform;
        return browserMatch;
    }

})('../');
