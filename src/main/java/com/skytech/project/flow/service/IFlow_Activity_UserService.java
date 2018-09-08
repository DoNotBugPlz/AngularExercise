package com.skytech.project.flow.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.flow.model.Flow_Activity_User;

import java.util.Map;

public interface IFlow_Activity_UserService extends IBaseService<Flow_Activity_User, Long> {


    GridResult LoadFauList(PageInfo pageInfo, Map map);

    Flow_Activity_User getFauInfo(Map map);
}