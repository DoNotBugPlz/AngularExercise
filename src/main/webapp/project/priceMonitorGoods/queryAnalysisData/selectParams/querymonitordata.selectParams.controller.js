/**
 * @author maxzhao
 * @time 2018/08/27.
 */
(function () {
    'use strict';

    angular
        .module('app.querymonitordata')
        .controller('QuerymonitordataSelectParamsCtrl', QuerymonitordataSelectParamsCtrl);
    QuerymonitordataSelectParamsCtrl.$inject = ['$scope', 'querymonitordataSelectParamsService', 'pageInfDefault', 'ngDialog', '$sce', '$q', '_', '$window'];

    /* @ngInject */
    function QuerymonitordataSelectParamsCtrl($scope, querymonitordataSelectParamsService, pageInfDefault, ngDialog, $sce, $q, _, $window) {
        var sp = this;
        window.sp = sp;
        sp.save = save;
        var fine_config_id = parseInt($scope.ngDialogData.fine_config_id);
        /* 任务的id-model对 */
        var tasksBuffer = {};
        var getSelfParamsSuccess = getSelfParamsSuccess;
        var getTaskDetailInfo = getTaskDetailInfo;

        var getTaskDetailInfoSuccess = getTaskDetailInfoSuccess;

        var searchSuccess = searchSuccess;
        /* 选监测表 */
        sp.selectTask = selectTask;
        sp.search = search;
        sp.reset = reset;

        /* 单选全选与删除 */
        sp.selectAllGoods = selectAllGoods;
        sp.removeGoods = removeGoods;
        sp.selectAllIndex = selectAllIndex;
        sp.removeIndex = removeIndex;
        sp.selectAllSite = selectAllSite;
        sp.removeSite = removeSite;
        active();

        /* 只有加载的时候才操作 */
        function active() {
            sp.tasks = [];
            /* 数据库加载数据 */
            sp.task_indexList = [];
            sp.task_goodsList = [];
            sp.task_m_siteList = [];
            /* 界面显示数据 */
            sp.task_indexShowList = [];
            sp.task_goodsShowList = [];
            sp.task_m_siteShowList = [];
            /* 初始化界面查询 */
            sp.searchParams = {'task': {}, 'goods_name': '', 'index_name': '', 'site_name': ''};
            var params = {'config_id': fine_config_id};
            querymonitordataSelectParamsService.getSelfParams(params)
                .then(getSelfParamsSuccess).then(getTaskDetailInfoSuccess);
        }

        //region 界面操作
        function selectTask() {


        }

        function search() {
            if (sp.searchParams.task.id) {
                var params = sp.searchParams;
                params.task_id = sp.searchParams.task.id;
                getTaskDetailInfo([params, params, params]).then(searchSuccess);
            } else {
                AppTools.errorTips("请选择监测表！")
            }
        }

        function reset() {
            sp.searchParams = {'task': {}, 'goods_name': '', 'index_name': '', 'site_name': ''};
        }

        function searchSuccess(responses) {
            sp.task_goodsShowList = responses[0].data;
            sp.task_indexShowList = responses[1].data;
            sp.task_m_siteShowList = responses[2].data;
            console.log("sp.task_goodsShowList");
            console.log(sp.task_goodsShowList);
            console.log("sp.task_indexShowList");
            console.log(sp.task_indexShowList);
            console.log("sp.task_m_siteShowList");
            console.log(sp.task_m_siteShowList);
        }

        //endregion
        //region 单选\全选\移除处理
        function selectAllGoods() {

        }


        function removeGoods(n) {

        }

        function selectAllIndex() {

        }

        function removeIndex(n) {

        }

        function selectAllSite() {

        }

        function removeSite(n) {

        }

        //endregion
        //region 初始化加载
        function getSelfParamsSuccess(response) {
            sp.tasks = response.data.rows;
            var task_index_ids = "";
            var task_goods_ids = "";
            var task_m_site_ids = "";
            angular.forEach(sp.tasks, function (data, index, arr) {
                tasksBuffer[data.id] = data;
                task_index_ids += task_index_ids ? ',' + data.task_index_id : data.task_index_id;
                task_goods_ids += task_goods_ids ? ',' + data.task_goods_id : data.task_goods_id;
                task_m_site_ids += task_m_site_ids ? ',' + data.task_m_site_id : data.task_m_site_id;
            });
            return getTaskDetailInfo([{'task_goods_ids': task_goods_ids}, {'task_index_ids': task_index_ids}, {'task_m_site_ids': task_m_site_ids}]);
        }

        function getTaskDetailInfo(data) {
            return $q.all([
                querymonitordataSelectParamsService.getTaskGood(data[0]),
                querymonitordataSelectParamsService.getTaskGoodIndex(data[1]),
                querymonitordataSelectParamsService.getTaskSite(data[2])
            ]);
        }

        /* 加载已存在的数据 */

        function getTaskDetailInfoSuccess(responses) {
            sp.task_goodsList = responses[0].data;
            sp.task_indexList = responses[1].data;
            sp.task_m_siteList = responses[2].data;
            console.log(sp.task_indexList);
            console.log(sp.task_goodsList);
            console.log(sp.task_m_siteList);
        }

        //endregion
        //region 保存
        function save() {
            angular.forEach(sp.task_indexList, function (data, index, arr) {
                if (!tasksBuffer[data.task_id]) {
                    tasksBuffer[data.task_id] = {};
                }
                tasksBuffer[data.task_id].task_index_id
                    = tasksBuffer[data.task_id].task_index_id
                    ? tasksBuffer[data.task_id].task_index_id + ',' + data.id
                    : tasksBuffer[data.task_id].task_index_id;
            });
            angular.forEach(sp.task_goodsList, function (data, index, arr) {
                if (!tasksBuffer[data.task_id]) {
                    tasksBuffer[data.task_id] = {};
                }
                tasksBuffer[data.task_id].task_goods_id
                    = tasksBuffer[data.task_id].task_goods_id
                    ? tasksBuffer[data.task_id].task_goods_id + ',' + data.id
                    : tasksBuffer[data.task_id].task_goods_id;
            });
            angular.forEach(sp.task_m_siteList, function (data, index, arr) {
                if (!tasksBuffer[data.task_id]) {
                    tasksBuffer[data.task_id] = {};
                }
                tasksBuffer[data.task_id].task_m_site_id
                    = tasksBuffer[data.task_id].task_m_site_id
                    ? tasksBuffer[data.task_id].task_m_site_id + ',' + data.id
                    : tasksBuffer[data.task_id].task_m_site_id;
            });
            var params = {};
            if (sp.tasks.length > 0) {
                params.user_id = sp.tasks[0].user_id;
            }
            params.row = tasksBuffer;
            params.fine_config_id = fine_config_id;
            querymonitordataSelectParamsService.save(params).then(saveSuccess).then(active);
        }

        function saveSuccess(response) {
            var result = response.data;
            if (result) {
                AppTools.successTips("保存成功！");
            } else {
                AppTools.errorTips("保存失敗！");
            }
            return $q.all();
        }

        //endregion
    }

})();
