/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service;


import com.skytech.persistence.service.IBaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Object;

import java.util.List;

public interface IT_Fine_ObjectService extends IBaseService<T_Fine_Object, Long> {


    List search(Long config_id);

    /**
     * 保存\修改 共享对象
     *
     * @param user_ids
     * @param config_id
     * @return
     */
    Boolean saveAll(List user_ids, Long config_id);
}