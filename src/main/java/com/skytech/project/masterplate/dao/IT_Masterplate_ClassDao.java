package com.skytech.project.masterplate.dao;

import com.skytech.persistence.dao.IDao;
import com.skytech.project.masterplate.model.T_Masterplate_Class;

public interface IT_Masterplate_ClassDao extends IDao<T_Masterplate_Class, Long> {


    void delClass(String id);
}