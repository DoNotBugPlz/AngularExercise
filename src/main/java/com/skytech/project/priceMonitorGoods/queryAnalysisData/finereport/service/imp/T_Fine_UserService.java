/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.imp;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_UserDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_UserService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_User;

import java.util.List;
import java.util.Map;

@Service("t_Fine_UserService")
public class T_Fine_UserService extends BaseService<T_Fine_User, Long> implements IT_Fine_UserService {

    private IT_Fine_UserDao t_Fine_UserDao;

    @Resource(name = "t_Fine_UserDao")
    @Override
    public void setBaseDao(IDao<T_Fine_User, Long> baseDao) {
        this.t_Fine_UserDao = (IT_Fine_UserDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public List loadUserConfig(Map params) {
        return t_Fine_UserDao.loadUserConfig(params);
    }
}