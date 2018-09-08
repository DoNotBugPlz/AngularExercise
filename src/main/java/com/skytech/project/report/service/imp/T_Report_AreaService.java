package com.skytech.project.report.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.report.dao.IT_Report_AreaDao;
import com.skytech.project.report.service.IT_Report_AreaService;
import com.skytech.project.report.model.T_Report_Area;

@Service("t_Report_AreaService")
public class T_Report_AreaService extends BaseService<T_Report_Area, Long> implements IT_Report_AreaService{

	private IT_Report_AreaDao t_Report_AreaDao;

	@Resource(name="t_Report_AreaDao")
	@Override
	public void setBaseDao(IDao<T_Report_Area, Long> baseDao) {
		this.t_Report_AreaDao = (IT_Report_AreaDao)baseDao;
		this.baseDao = baseDao;
	}











}