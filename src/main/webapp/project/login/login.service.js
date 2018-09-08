
(function (rootPath) {
    'use strict';

    angular
        .module('app.login')
        .service('loginService', loginService);
    loginService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function loginService($http,SYSTEM) {
        this.oneNonce = function (params) {
            return $http({
                url: rootPath+'Login/OneNonce.do',
                method: 'POST',
                headers:{"RequestType":SYSTEM.RequestParamType},//强行适配原平台后台使用RequestParam接收参数方式
                data: params
            })
        }
        this.loginIn = function (params) {
            return $http({
                url: rootPath+'Common/login/AccessToken.do',
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'POST',
                data: params
            })
        }
        this.loginOut = function () {
            return $http({
                url: rootPath+'Login/LogOut.do',
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'POST'
            })
        }
    }

})('../');


