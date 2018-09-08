package com.skytech.project.flow.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.flow.model.Flow_Activity_User;

import java.util.Map;

public interface IFlow_Activity_UserDao extends IDao<Flow_Activity_User, Long> {


    GridResult LoadFauList(PageInfo pageInfo, Map map);

    Flow_Activity_User getFauInfo(Map map);
}