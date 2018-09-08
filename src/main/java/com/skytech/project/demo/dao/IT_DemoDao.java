package com.skytech.project.demo.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.demo.model.T_Demo;

import java.util.Map;

public interface IT_DemoDao extends IDao<T_Demo, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}