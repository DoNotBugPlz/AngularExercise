package com.skytech.flow.agent.service.imp;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.flow.agent.dao.IT_Agent_UserDao;
import com.skytech.flow.agent.model.T_Agent_User;
import com.skytech.flow.agent.service.IT_Agent_UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("t_Agent_UserService")
public class T_Agent_UserService extends BaseService<T_Agent_User, String> implements IT_Agent_UserService{

	private IT_Agent_UserDao t_Agent_UserDao;

	@Resource(name="t_Agent_UserDao")
	@Override
	public void setBaseDao(IDao<T_Agent_User, String> baseDao) {
		this.t_Agent_UserDao = (IT_Agent_UserDao)baseDao;
		this.baseDao = baseDao;
	}

	/**
	 * 根据代理人获得委托人（代理人需在有效的代理期内）
	 *
	 * @param agent 代理人
	 * @return
	 */
	@Override
	public List<String> getPrincipalsBetweenEffectiveTime(String agent) {
		return t_Agent_UserDao.getPrincipalsBetweenEffectiveTime(agent);
	}

	/**
	 * 查询代理人是否与办理人存在委托关系
	 *
	 * @param currentUserLoginName 代理人
	 * @param assigneeLoginName    办理人
	 * @return
	 */
	@Override
	public long countAgentAndPrincipal(String currentUserLoginName, String assigneeLoginName) {
		return t_Agent_UserDao.countAgentAndPrincipal(currentUserLoginName, assigneeLoginName);
	}

	/**
	 * 查询所有代理人
	 *
	 * @param params   查询参数
	 * @param pageInfo 分页信息
	 * @return
	 */
	@Override
	public GridResult listAllAgentUsers(Map<String, Object> params, PageInfo pageInfo) {
		return t_Agent_UserDao.listAllAgentUsers(params,pageInfo);
	}


}