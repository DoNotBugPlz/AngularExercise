package com.skytech.project.report.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.report.dao.IT_ReportDao;
import com.skytech.project.report.service.IT_ReportService;
import com.skytech.project.report.model.T_Report;

@Service("t_ReportService")
public class T_ReportService extends BaseService<T_Report, Long> implements IT_ReportService{

	private IT_ReportDao t_ReportDao;

	@Resource(name="t_ReportDao")
	@Override
	public void setBaseDao(IDao<T_Report, Long> baseDao) {
		this.t_ReportDao = (IT_ReportDao)baseDao;
		this.baseDao = baseDao;
	}











}