(function () {
    'use strict';

    angular
        .module('app.changepwd')
        .controller('ChangePwdCtrl', ChangePwdCtrl);

    ChangePwdCtrl.$inject = ['localStorageService','$scope','changepwdService','ngDialog'];

    /* @ngInject */
    function ChangePwdCtrl(localStorageService,$scope,changepwdService,ngDialog) {
        var currentUser = localStorageService.get("currentUser");
        $scope.userName = currentUser.chinaname;
        $scope.changePwd = function () {
            if($scope.pwd&&$scope.pwdAgain&&$scope.pwd==$scope.pwdAgain){
                var params = {
                    pwd: CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(currentUser.loginname, $scope.pwd))
                };
                changepwdService.changePwd(params).then(function () {
                    AppTools.successTips("修改密码成功!");
                    ngDialog.close($scope.ngDialogId);
                })
            }else{
                AppTools.errorTips("请确认两次输入密码相同!");
            }
        }



    }
})();

