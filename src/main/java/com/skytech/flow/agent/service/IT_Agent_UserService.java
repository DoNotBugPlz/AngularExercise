package com.skytech.flow.agent.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.flow.agent.model.T_Agent_User;

import java.util.List;
import java.util.Map;

public interface IT_Agent_UserService extends IBaseService<T_Agent_User, String> {

    /**
     * 根据代理人获得委托人（代理人需在有效的代理期内）
     *
     * @param agent 代理人
     * @return
     */
    List<String> getPrincipalsBetweenEffectiveTime(String agent);

    /**
     * 查询代理人是否与办理人存在委托关系
     *
     * @param currentUserLoginName 代理人
     * @param assigneeLoginName    办理人
     * @return
     */
    long countAgentAndPrincipal(String currentUserLoginName, String assigneeLoginName);

    /**
     * 查询所有代理人
     *
     * @param params   查询参数
     * @param pageInfo 分页信息
     * @return
     */
    GridResult listAllAgentUsers(Map<String, Object> params, PageInfo pageInfo);
}