/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service;

import com.skytech.persistence.service.IBaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_User;

import java.util.List;
import java.util.Map;

public interface IT_Fine_UserService extends IBaseService<T_Fine_User, Long> {


    List loadUserConfig(Map params);
}