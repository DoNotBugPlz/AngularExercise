/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service;

import com.skytech.persistence.service.IBaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Collect;

import java.util.HashMap;

public interface IT_Fine_CollectService extends IBaseService<T_Fine_Collect, Long> {

    /**
     * 取消收藏
     *
     * @param params
     * @return
     */
    boolean cancelCollctData(HashMap params);

    /**
     * 添加收藏
     *
     * @param currentUserId
     * @param ids
     * @return
     */
    Object addCollctData(Long currentUserId, String ids);
}