/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao;

import com.skytech.persistence.dao.IDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Object;

import java.util.List;

public interface IT_Fine_ObjectDao extends IDao<T_Fine_Object, Long> {


    List search(Long config_id);

    Boolean delList(Long config_id, List<Long> longs);
}