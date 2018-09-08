/**
 * 自定义http请求和响应
 */
(function () {
    'use strict';
    angular.module("app.core")
        .factory("httpInterceptor", httpInterceptor)
        .config(commInterceptor);

    httpInterceptor.$inject = ['$q', '$window', '$location', 'localStorageService', '$templateCache', 'SYSTEM'];

    commInterceptor.$inject = ['$httpProvider'];

    function httpInterceptor($q, $window, $location, localStorageService, $templateCache, SYSTEM) {
        var interceptor = {
            'request': function (config) {//success request\
                AppTools.showLoading();
                config.headers = config.headers || {};
                if (config.headers["Accept"] && config.headers["Accept"].indexOf("application/json") > -1) {
                    // config.method.toLowerCase() === "post" ? (config.data = config.data || {}) : null;
                    // config.method.toLowerCase() === "get" ? (config.params = config.params || {}) : null;
                    if (config.headers["RequestType"] === SYSTEM.RequestParamType) {
                        //强行适配原平台后台使用RequestParam接收参数方式
                        config.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
                        if (config.method.toLowerCase() === "post") {
                            config.transformRequest = function (obj) {
                                var str = [];
                                for (var p in obj) {
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                }
                                str.push(encodeURIComponent('tempTimeStamp') + "=" + encodeURIComponent(new Date()));
                                return str.join("&");
                            }
                        }
                    }
                    //防止IE8缓存
                    if (!config['servertypefinebI']) {
                        config.url += config.url.indexOf("?") > -1 ? "&" : "?";
                        config.url += "tempTimeStamp=" + new Date().getTime();
                    }
                }
                return config;
            },
            'response': function (response) {//成功响应
                AppTools.hideLoading();
                var result = response.data;
                var is_json = typeof result && Object.prototype.toString.call(result).toLowerCase() === "[object object]" && !result.length;
                if (!is_json) {//非json数据
                    return response;
                }
                var deferred = $q.defer();
                if (result.rows != null || !result.iserror) {//成功返回
                    var data = result.data ? result.data : result;
                    response.data = data;
                    deferred.resolve(response);
                } else {//失败返回
                    var data = result.data ? result.data : result;
                    response.data = data;
                    deferred.reject(response);
                }
                return deferred.promise;
            },
            'requestError': function (response) {//请求出错
                AppTools.hideLoading();
                return response;
            },
            'responseError': function (response) {//响应出错
                AppTools.hideLoading();
                if (response.status + "" === '400') {//请求错误
                    AppTools.errorTips("请求错误！")
                }
                if (response.status + "" === '404') {//请求错误
                    AppTools.errorTips("请求不存在！")
                }
                if (response.status + "" === '500') {//后台处理错误
                    AppTools.errorTips("后台处理错误！")
                }
                if (response.status + "" === '401') {//用户未登录
                    //重新登录
                    $templateCache.removeAll();//清除缓存
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
        return interceptor;
    }

    function commInterceptor($httpProvider) {
        $httpProvider.interceptors.push("httpInterceptor");
    }

})();
