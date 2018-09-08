/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Config;

import java.util.Map;

public interface IT_Fine_ConfigDao extends IDao<T_Fine_Config, Long> {


    GridResult search(Map params, PageInfo pageInfo);

    /**
     * 查询本人的记录
     * @param params
     * @return
     */
    GridResult searchDataByNoUrl(Map params);

    /**
     * 查询其他人的共享记录
     * @param params
     * @param pageInfo
     * @return
     */
    GridResult searchOtherShare(Map params, PageInfo pageInfo);

    Boolean delList(Long user_id, String ids);
}