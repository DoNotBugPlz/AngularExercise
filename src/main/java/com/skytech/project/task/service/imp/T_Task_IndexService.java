package com.skytech.project.task.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_Task_IndexDao;
import com.skytech.project.task.service.IT_Task_IndexService;
import com.skytech.project.task.model.T_Task_Index;

@Service("t_Task_IndexService")
public class T_Task_IndexService extends BaseService<T_Task_Index, Long> implements IT_Task_IndexService{

	private IT_Task_IndexDao t_Task_IndexDao;

	@Resource(name="t_Task_IndexDao")
	@Override
	public void setBaseDao(IDao<T_Task_Index, Long> baseDao) {
		this.t_Task_IndexDao = (IT_Task_IndexDao)baseDao;
		this.baseDao = baseDao;
	}











}