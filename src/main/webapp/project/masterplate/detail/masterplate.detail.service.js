(function (rootPath) {
    'use strict';

    angular
        .module('app.masterplate')
        .service('masterplateDetailService', masterplateDetailService);
    masterplateDetailService.$inject = ['$http'];

    /* @ngInject */
    function masterplateDetailService($http) {
        this.loadMasterplateInfo = loadMasterplateInfo;
        this.saveMasterplateBase = saveMasterplateBase;
        this.saveClassInfo = saveClassInfo;
        this.delClass = delClass;

        //加载模版详细信息
        function loadMasterplateInfo(params) {
            return $http({
                url: rootPath + "T_masterplate/loadMasterplateInfo.do",
                method: 'get',
                params: params
            })
        }


        //新增模版基本信息
        function saveMasterplateBase(params) {
            return $http({
                url: rootPath + "T_masterplate/save.do",
                method: 'post',
                data: params
            })
        }

        //新增品类信息
        function saveClassInfo(params) {
            return $http({
                url: rootPath + "T_masterplate_class/save.do",
                method: 'post',
                data: params
            })
        }

        //删除品类信息
        function delClass(params) {
            return $http({
                url: rootPath + "T_masterplate_class/delClass.do",
                method: 'post',
                data: params
            })
        }


    }

})('../');


