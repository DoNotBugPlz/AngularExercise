package com.skytech.project.task.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_Task_AreaDao;
import com.skytech.project.task.service.IT_Task_AreaService;
import com.skytech.project.task.model.T_Task_Area;

@Service("t_Task_AreaService")
public class T_Task_AreaService extends BaseService<T_Task_Area, Long> implements IT_Task_AreaService{

	private IT_Task_AreaDao t_Task_AreaDao;

	@Resource(name="t_Task_AreaDao")
	@Override
	public void setBaseDao(IDao<T_Task_Area, Long> baseDao) {
		this.t_Task_AreaDao = (IT_Task_AreaDao)baseDao;
		this.baseDao = baseDao;
	}











}