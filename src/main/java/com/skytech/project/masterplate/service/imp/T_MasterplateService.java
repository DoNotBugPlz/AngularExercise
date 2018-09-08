package com.skytech.project.masterplate.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.masterplate.dao.IT_MasterplateDao;
import com.skytech.project.masterplate.service.IT_MasterplateService;
import com.skytech.project.masterplate.model.T_Masterplate;

import java.util.HashMap;
import java.util.Map;

@Service("t_MasterplateService")
public class T_MasterplateService extends BaseService<T_Masterplate, Long> implements IT_MasterplateService {

    private IT_MasterplateDao t_MasterplateDao;

    @Resource(name = "t_MasterplateDao")
    @Override
    public void setBaseDao(IDao<T_Masterplate, Long> baseDao) {
        this.t_MasterplateDao = (IT_MasterplateDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public GridResult search(PageInfo pageInfo, Map map) {
        return t_MasterplateDao.search(pageInfo, map);
    }

    @Override
    public Map loadMasterplateInfo(String id) {
        T_Masterplate t_masterplate = t_MasterplateDao.get(Long.parseLong(id));
        GridResult t_class = t_MasterplateDao.getClassList(id);
        Map res = new HashMap();
        res.put("t_masterplate", t_masterplate);
        res.put("t_class", t_class);
        return res;
    }

    @Override
    public void changeStatue(String id, String value) {
        t_MasterplateDao.changeStatue(id, value);
    }
}