
(function (rootPath) {
    'use strict';

    angular
        .module('app.core')
        .service('coreService', coreService);
    /* @ngInject */
    coreService.$inject = ['$http', '$rootScope', '$q','localStorageService'];

    /* @ngInject */
    function coreService($http, $rootScope, $q,localStorageService) {
        this.getCurrentUser = function () {
            var promise = $q.defer();
            if (!angular.isUndefined(localStorageService.get("currentUser"))) {
                promise.resolve({
                    data: localStorageService.get("currentUser")
                });
                promise = promise.promise;
            } else {
                promise = $http({
                    url: rootPath+'Sys_user/GetCurrentUserInfo.do',
                    method: 'GET'
                });
            }
            return promise;
        }

        /**
         * 批量获取字典项
         * @param constnames  以逗号分隔
         * @returns {*}
         */
        this.getCategoryValues = function (constnames) {
            return $http({
                url: rootPath +'Common/categoryvalue/GetCategoryValuesMap?constnames='+constnames,
                method: 'GET'
            });
        };
        /**
         * 将字典值转为数字
         * 原因：select匹配时，如果是数字是匹配不到字符串的
         * 根据实际情况决定是否需要转
         * @type {Array}
         */
        this.covertCategoryValueIdToInt = function (categoryValues) {
            return  _.map(categoryValues,function (e) {
                e.id = parseInt(e.id);
                return e;
            }) ;
        };
        /**
         * 拖拽排序
         */
        this.dataDragSort = function (params) {
            return $http({
                url: rootPath +'Common/DataDragSort.do',
                method: 'POST',
                data:params
            });
        };

    }
})("../");
