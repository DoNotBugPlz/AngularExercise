package com.skytech.project.exchange.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.exchange.model.T_Exchange_Info;

import java.util.List;
import java.util.Map;

public interface IT_Exchange_InfoDao extends IDao<T_Exchange_Info, Long> {


    GridResult search(PageInfo pageInfo, Map map);

    int delList(List<String> strings);
}