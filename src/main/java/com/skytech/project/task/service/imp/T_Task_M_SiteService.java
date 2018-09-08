package com.skytech.project.task.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_Task_M_SiteDao;
import com.skytech.project.task.service.IT_Task_M_SiteService;
import com.skytech.project.task.model.T_Task_M_Site;

@Service("t_Task_M_SiteService")
public class T_Task_M_SiteService extends BaseService<T_Task_M_Site, Long> implements IT_Task_M_SiteService{

	private IT_Task_M_SiteDao t_Task_M_SiteDao;

	@Resource(name="t_Task_M_SiteDao")
	@Override
	public void setBaseDao(IDao<T_Task_M_Site, Long> baseDao) {
		this.t_Task_M_SiteDao = (IT_Task_M_SiteDao)baseDao;
		this.baseDao = baseDao;
	}











}