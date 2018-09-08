package com.skytech.project.matter.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.matter.dao.IT_Matter_MonitorDao;
import com.skytech.project.matter.service.IT_Matter_MonitorService;
import com.skytech.project.matter.model.T_Matter_Monitor;

@Service("t_Matter_MonitorService")
public class T_Matter_MonitorService extends BaseService<T_Matter_Monitor, Long> implements IT_Matter_MonitorService{

	private IT_Matter_MonitorDao t_Matter_MonitorDao;

	@Resource(name="t_Matter_MonitorDao")
	@Override
	public void setBaseDao(IDao<T_Matter_Monitor, Long> baseDao) {
		this.t_Matter_MonitorDao = (IT_Matter_MonitorDao)baseDao;
		this.baseDao = baseDao;
	}











}