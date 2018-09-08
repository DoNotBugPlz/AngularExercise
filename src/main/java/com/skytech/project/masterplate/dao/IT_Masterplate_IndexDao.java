package com.skytech.project.masterplate.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.masterplate.model.T_Masterplate_Index;

import java.util.List;

public interface IT_Masterplate_IndexDao extends IDao<T_Masterplate_Index, Long> {


    GridResult search(PageInfo pageInfo);

    int delList(List<String> strings);

    void delTrend(String parentId);
}