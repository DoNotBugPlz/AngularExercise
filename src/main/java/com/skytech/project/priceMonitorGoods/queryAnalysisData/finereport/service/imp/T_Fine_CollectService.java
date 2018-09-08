/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.core.util.StringUtil;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_CollectDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_CollectService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Collect;

import java.util.HashMap;

@Service("t_Fine_CollectService")
public class T_Fine_CollectService extends BaseService<T_Fine_Collect, Long> implements IT_Fine_CollectService {

    private IT_Fine_CollectDao t_Fine_CollectDao;

    @Resource(name = "t_Fine_CollectDao")
    @Override
    public void setBaseDao(IDao<T_Fine_Collect, Long> baseDao) {
        this.t_Fine_CollectDao = (IT_Fine_CollectDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public boolean cancelCollctData(HashMap params) {
        return t_Fine_CollectDao.cancelCollctData(params);
    }

    @Override
    public Object addCollctData(Long user_id, String ids) {
        T_Fine_Collect collect;
        for (String id : ids.trim().split(",")) {
            collect = new T_Fine_Collect();
            collect.setUser_id(user_id);
            collect.setFine_config_id(Long.parseLong(id));
            collect.setDelstatus(0);
            t_Fine_CollectDao.save(collect);
        }
        return null;
    }
}