package com.skytech.project.monitor.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.monitor.dao.IT_Monitor_ReportDao;
import com.skytech.project.monitor.service.IT_Monitor_ReportService;
import com.skytech.project.monitor.model.T_Monitor_Report;

@Service("t_Monitor_ReportService")
public class T_Monitor_ReportService extends BaseService<T_Monitor_Report, Long> implements IT_Monitor_ReportService{

	private IT_Monitor_ReportDao t_Monitor_ReportDao;

	@Resource(name="t_Monitor_ReportDao")
	@Override
	public void setBaseDao(IDao<T_Monitor_Report, Long> baseDao) {
		this.t_Monitor_ReportDao = (IT_Monitor_ReportDao)baseDao;
		this.baseDao = baseDao;
	}











}