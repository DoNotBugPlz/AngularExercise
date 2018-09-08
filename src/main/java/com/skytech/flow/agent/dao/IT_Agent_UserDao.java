package com.skytech.flow.agent.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.flow.agent.model.T_Agent_User;

import java.util.List;
import java.util.Map;

public interface IT_Agent_UserDao extends IDao<T_Agent_User, String> {
    List<String> getPrincipalsBetweenEffectiveTime(String agent);

    long countAgentAndPrincipal(String currentUserLoginName, String assigneeLoginName);

    GridResult listAllAgentUsers(Map<String, Object> params, PageInfo pageInfo);
}