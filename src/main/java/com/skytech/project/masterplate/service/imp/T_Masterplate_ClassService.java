package com.skytech.project.masterplate.service.imp;


import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.masterplate.dao.IT_Masterplate_ClassDao;
import com.skytech.project.masterplate.service.IT_Masterplate_ClassService;
import com.skytech.project.masterplate.model.T_Masterplate_Class;

@Service("t_Masterplate_ClassService")
public class T_Masterplate_ClassService extends BaseService<T_Masterplate_Class, Long> implements IT_Masterplate_ClassService {

    private IT_Masterplate_ClassDao t_Masterplate_ClassDao;

    @Resource(name = "t_Masterplate_ClassDao")
    @Override
    public void setBaseDao(IDao<T_Masterplate_Class, Long> baseDao) {
        this.t_Masterplate_ClassDao = (IT_Masterplate_ClassDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public void delClass(String id) {
        t_Masterplate_ClassDao.delClass(id);
    }
}