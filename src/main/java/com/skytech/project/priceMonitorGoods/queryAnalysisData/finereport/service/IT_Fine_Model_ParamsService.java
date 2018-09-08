/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Model_Params;

import java.util.List;

public interface IT_Fine_Model_ParamsService extends IBaseService<T_Fine_Model_Params, Long> {


    GridResult getSelfParams(Long config_id, Long currentUserId, List<Long> area_id);
}