package com.skytech.project.task.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_TaskDao;
import com.skytech.project.task.service.IT_TaskService;
import com.skytech.project.task.model.T_Task;

import java.util.Map;

@Service("t_TaskService")
public class T_TaskService extends BaseService<T_Task, Long> implements IT_TaskService{

	private IT_TaskDao t_TaskDao;

	@Resource(name="t_TaskDao")
	@Override
	public void setBaseDao(IDao<T_Task, Long> baseDao) {
		this.t_TaskDao = (IT_TaskDao)baseDao;
		this.baseDao = baseDao;
	}
	public GridResult loadTaskList(PageInfo pageInfo, Map map){
		return t_TaskDao.loadTaskList(pageInfo,map);

	}











}