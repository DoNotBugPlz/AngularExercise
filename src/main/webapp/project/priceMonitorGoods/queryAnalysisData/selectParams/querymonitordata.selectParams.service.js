/**
 * @author maxzhao
 * @time 2018/08/27.
 */
(function (rootPath) {
    'use strict';

    angular
        .module('app.querymonitordata')
        .service('querymonitordataSelectParamsService', querymonitordataSelectParamsService);
    querymonitordataSelectParamsService.$inject = ['$http', 'SYSTEM'];

    /* @ngInject */
    function querymonitordataSelectParamsService($http, SYSTEM) {
        this.save = function (params) {
            return $http({
                url: rootPath + 'T_fine_model_params/save',
                method: 'POST',
                data: params
            });
        };
        /**
         * 获取当前区划内的当前设置好的查询条件
         * @param params {config_id}
         * @returns {*}
         */
        this.getSelfParams = function (params) {
            return $http({
                url: rootPath + 'T_fine_model_params/load/self',
                method: 'GET',
                params: params
            });
        };
        /**
         * 获取下級区划内的当前设置好的查询条件
         * @param params {config_id}
         * @returns {*}
         */
        this.getLowerParams = function (params) {
            return $http({
                url: rootPath + 'T_fine_model_params/load/lower',
                method: 'GET',
                params: params
            });
        };
        /**
         * 获取省級共享内的当前设置好的查询条件
         * @param params {config_id}
         * @returns {*}
         */
        this.getShareParams = function (params) {
            return $http({
                url: rootPath + 'T_fine_model_params/load/share',
                method: 'GET',
                params: params
            });
        };
        /**
         * 获取查询条件中任务下的指标
         * @param params {task_index_ids}
         * @returns {*}
         */
        this.getTaskGoodIndex = function (params) {
            return $http({
                url: rootPath + 'T_fine_model_params/get_task_good_index',
                method: 'GET',
                params: params
            });
        };
        /**
         * 获取查询条件中任务下的商品
         * @param params {task_goods_ids}
         * @returns {*}
         */
        this.getTaskGood = function (params) {
            return $http({
                url: rootPath + 'T_fine_model_params/get_task_goods',
                method: 'GET',
                params: params
            });
        };
        /**
         * 获取查询条件中任务下的上报单位
         * @param params {task_m_site_ids}
         * @returns {*}
         */
        this.getTaskSite = function (params) {
            return $http({
                url: rootPath + 'T_fine_model_params/get_task_site',
                method: 'GET',
                params: params
            });
        };

    }
})('../');


