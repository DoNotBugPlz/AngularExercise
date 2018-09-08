package com.skytech.project.masterplate.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.masterplate.model.T_Masterplate;
import com.skytech.project.masterplate.model.T_Masterplate_Class;

import java.util.List;
import java.util.Map;

public interface IT_MasterplateDao extends IDao<T_Masterplate, Long> {


    GridResult search(PageInfo pageInfo, Map map);

    GridResult getClassList(String id);

    void changeStatue(String id, String value);
}