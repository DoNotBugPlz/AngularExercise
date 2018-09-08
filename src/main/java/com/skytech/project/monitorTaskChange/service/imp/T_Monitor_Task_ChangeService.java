package com.skytech.project.monitorTaskChange.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.monitorTaskChange.dao.IT_Monitor_Task_ChangeDao;
import com.skytech.project.monitorTaskChange.service.IT_Monitor_Task_ChangeService;
import com.skytech.project.monitorTaskChange.model.T_Monitor_Task_Change;

@Service("t_Monitor_Task_ChangeService")
public class T_Monitor_Task_ChangeService extends BaseService<T_Monitor_Task_Change, Long> implements IT_Monitor_Task_ChangeService{

	private IT_Monitor_Task_ChangeDao t_Monitor_Task_ChangeDao;

	@Resource(name="t_Monitor_Task_ChangeDao")
	@Override
	public void setBaseDao(IDao<T_Monitor_Task_Change, Long> baseDao) {
		this.t_Monitor_Task_ChangeDao = (IT_Monitor_Task_ChangeDao)baseDao;
		this.baseDao = baseDao;
	}











}