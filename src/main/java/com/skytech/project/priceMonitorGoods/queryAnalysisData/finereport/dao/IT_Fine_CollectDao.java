/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao;

import com.skytech.persistence.dao.IDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Collect;

import java.util.HashMap;

public interface IT_Fine_CollectDao extends IDao<T_Fine_Collect, Long> {


    boolean cancelCollctData(HashMap params);
}