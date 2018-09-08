(function (rootPath) {
    'use strict';

    angular
        .module('app.sms')
        .service('sensitivewordsdetailservice', sensitivewordsdetailservice);
    sensitivewordsdetailservice.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function sensitivewordsdetailservice($http, SYSTEM) {
         this.loadsensitivewords = loadsensitivewords;
         this.savesensitivewords = savesensitivewords;

        function loadsensitivewords(params) {
            return $http({
                url: rootPath + "T_sensitiveword/loadSensitive.do",
                method: 'get',
                params: params
            })
        }

        function savesensitivewords(params) {
            return $http({
                url: rootPath + "T_sensitiveword/save.do",
                method: 'post',
                data:params
            })
        }




    }



})('../');


