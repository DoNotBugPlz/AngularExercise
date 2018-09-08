package com.skytech.project.task.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_Task_CycleDao;
import com.skytech.project.task.service.IT_Task_CycleService;
import com.skytech.project.task.model.T_Task_Cycle;

@Service("t_Task_CycleService")
public class T_Task_CycleService extends BaseService<T_Task_Cycle, Long> implements IT_Task_CycleService{

	private IT_Task_CycleDao t_Task_CycleDao;

	@Resource(name="t_Task_CycleDao")
	@Override
	public void setBaseDao(IDao<T_Task_Cycle, Long> baseDao) {
		this.t_Task_CycleDao = (IT_Task_CycleDao)baseDao;
		this.baseDao = baseDao;
	}











}