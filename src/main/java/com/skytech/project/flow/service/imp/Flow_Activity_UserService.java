package com.skytech.project.flow.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.flow.dao.IFlow_Activity_UserDao;
import com.skytech.project.flow.service.IFlow_Activity_UserService;
import com.skytech.project.flow.model.Flow_Activity_User;

import java.util.Map;

@Service("flow_Activity_UserService")
public class Flow_Activity_UserService extends BaseService<Flow_Activity_User, Long> implements IFlow_Activity_UserService{

	private IFlow_Activity_UserDao flow_Activity_UserDao;

	@Resource(name="flow_Activity_UserDao")
	@Override
	public void setBaseDao(IDao<Flow_Activity_User, Long> baseDao) {
		this.flow_Activity_UserDao = (IFlow_Activity_UserDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public GridResult LoadFauList(PageInfo pageInfo, Map map) {
		return flow_Activity_UserDao.LoadFauList(pageInfo,map);
	}

	@Override
	public Flow_Activity_User getFauInfo(Map map) {
		return flow_Activity_UserDao.getFauInfo(map);
	}
}