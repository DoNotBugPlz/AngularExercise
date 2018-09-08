/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.imp;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_ObjectDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Object;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_ObjectService;
import com.skytech.util.StringExtUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("t_Fine_ObjectService")
public class T_Fine_ObjectService extends BaseService<T_Fine_Object, Long> implements IT_Fine_ObjectService {

    private IT_Fine_ObjectDao t_Fine_ObjectDao;

    @Resource(name = "t_Fine_ObjectDao")
    @Override
    public void setBaseDao(IDao<T_Fine_Object, Long> baseDao) {
        this.t_Fine_ObjectDao = (IT_Fine_ObjectDao) baseDao;
        this.baseDao = baseDao;
    }

    @Override
    public List search(Long config_id) {
        return t_Fine_ObjectDao.search(config_id);
    }

    @Override
    public Boolean saveAll(List userList, Long config_id) {
        t_Fine_ObjectDao.delList(config_id, userList);
        T_Fine_Object t_fine_object;
        for (Object user_id : userList) {
            t_fine_object = new T_Fine_Object();
            t_fine_object.setUser_id(Long.parseLong(StringUtil.getStr(user_id)));
            t_fine_object.setFine_config_id(config_id);
            t_fine_object.setDelstatus(0);
            t_Fine_ObjectDao.saveOrUpdateWithNotNullProperties(t_fine_object);
        }
        return true;
    }
}