/**
 * Created by tr on 2018年8月17日17:03:16
 */
(function (rootPath) {
    'use strict';
    angular.module('app.category')
        .service('categoryValueDetailService',categoryValueDetailService);
    categoryValueDetailService.$inject = ['$http','SYSTEM'];

    function categoryValueDetailService($http,SYSTEM) {
        this.loadSysCategoryValueDetail = function (params) {
            return $http({// 获取字典值信息
                url: rootPath + "Sys_categoryvalue/LoadForm.do",
                method: 'get',
                params: params
            })
        }

        this.validCategoryValueRefid = function (params) {
            return $http({// 验证编码是否被占用
                url: rootPath + "Sys_categoryvalue/IsExistRefid.do",
                method: 'get',
                params: params
            })
        }
        this.addOrUpdateCategoryValue = function (params) {
            return $http({// 保存子项值
                url: rootPath + "Sys_categoryvalue/SaveForm.do",
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'post',
                params: params
            })
        }
    }
})('../');