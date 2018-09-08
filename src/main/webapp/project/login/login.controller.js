(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['loginService', '$scope', 'localStorageService', '$state' ,'$log'];

    /* @ngInject */
    function LoginCtrl(loginService, $scope, localStorageService, $state, $log) {
        var vm = this;
        vm.title = 'LoginCtrl';
        vm.sliderUnlock = false;
        vm.loginSystem = function () {
            if(!vm.login_code||!vm.password){
                toastr['error']('请输入用户名及密码！');
                return;
            }
            var params = {
                loginKey: vm.login_code,
                password: vm.password
            };
            loginService.oneNonce(params)
                .then(loginOneNonceSuccess, loginError)
                .then(loginService.loginIn)
                .then(loginInSuccess, loginError)
        };
        var loginOneNonceSuccess = function (response) {
            var nonce = response.data;
            var params = {
                loginKey: vm.login_code,
                signDataFromClient: CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(vm.login_code, vm.password)), nonce))
            };
            return params;
        };

        var loginInSuccess =  function (response) {
            var data = response.data;
            localStorageService.set("currentUser", data);
            localStorageService.set("userId", data.id);
            $state.go('app');
        };

        var loginError = function (response) {
            var data = response.data;
           AppTools.errorTips(data.message);
        };
    }
})();

