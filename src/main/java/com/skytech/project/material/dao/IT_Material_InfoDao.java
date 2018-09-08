package com.skytech.project.material.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.material.model.T_Material_Info;

import java.util.List;
import java.util.Map;

public interface IT_Material_InfoDao extends IDao<T_Material_Info, String> {


    GridResult search(PageInfo pageInfo, Map map);

    int delList(List<String> strings);

    GridResult submissionList(PageInfo pageInfo, Map map);
}