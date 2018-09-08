/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao;

import com.skytech.persistence.dao.IDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_User;

import java.util.List;
import java.util.Map;

public interface IT_Fine_UserDao extends IDao<T_Fine_User, Long> {


    List loadUserConfig(Map params);
}