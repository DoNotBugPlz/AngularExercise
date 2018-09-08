package com.skytech.project.monitor.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.monitor.dao.IT_Monitor_Report_ClassDao;
import com.skytech.project.monitor.service.IT_Monitor_Report_ClassService;
import com.skytech.project.monitor.model.T_Monitor_Report_Class;

@Service("t_Monitor_Report_ClassService")
public class T_Monitor_Report_ClassService extends BaseService<T_Monitor_Report_Class, Long> implements IT_Monitor_Report_ClassService{

	private IT_Monitor_Report_ClassDao t_Monitor_Report_ClassDao;

	@Resource(name="t_Monitor_Report_ClassDao")
	@Override
	public void setBaseDao(IDao<T_Monitor_Report_Class, Long> baseDao) {
		this.t_Monitor_Report_ClassDao = (IT_Monitor_Report_ClassDao)baseDao;
		this.baseDao = baseDao;
	}











}