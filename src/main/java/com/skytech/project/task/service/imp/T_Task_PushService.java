package com.skytech.project.task.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_Task_PushDao;
import com.skytech.project.task.service.IT_Task_PushService;
import com.skytech.project.task.model.T_Task_Push;

@Service("t_Task_PushService")
public class T_Task_PushService extends BaseService<T_Task_Push, Long> implements IT_Task_PushService{

	private IT_Task_PushDao t_Task_PushDao;

	@Resource(name="t_Task_PushDao")
	@Override
	public void setBaseDao(IDao<T_Task_Push, Long> baseDao) {
		this.t_Task_PushDao = (IT_Task_PushDao)baseDao;
		this.baseDao = baseDao;
	}











}