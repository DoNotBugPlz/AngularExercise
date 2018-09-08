package com.skytech.project.sms.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.sms.model.T_Sensitiveword;

import java.util.Map;

public interface IT_SensitivewordDao extends IDao<T_Sensitiveword, Long> {

    GridResult search(PageInfo pageinfo, Map map);
}