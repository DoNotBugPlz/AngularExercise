/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao;


import com.skytech.basic.wrapper.GridResult;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Model_Params;

import java.util.List;

public interface IT_Fine_Model_ParamsDao extends IDao<T_Fine_Model_Params, Long> {

    /**
     * 获取当前用户的模板查询条件记录
     * @param config_id
     * @param currentUserId
     * @param area_ids
     * @return
     */
    GridResult getSelfParams(Long config_id, Long currentUserId, List<Long> area_ids);

    /**
     * 获取创建模板用户的模板查询条件记录
     * @param config_id
     * @param area_ids
     * @return
     */
    GridResult getRootParams(Long config_id, List<Long> area_ids);
}