
(function (rootPath) {
    'use strict';

    angular
        .module('app.changepwd')
        .service('changepwdService', changepwdService);
    changepwdService.$inject = ['$http'];
    /* @ngInject */
    function changepwdService($http) {
        this.changePwd = function (params) {
            return $http({
                url: rootPath + "Sys_user/ChangePassWord.do",
                method: 'POST',
                data: params
            })
        }
    }

})('../');


