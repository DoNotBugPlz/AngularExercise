package com.skytech.project.report.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.report.dao.IT_Report_M_SiteDao;
import com.skytech.project.report.service.IT_Report_M_SiteService;
import com.skytech.project.report.model.T_Report_M_Site;

@Service("t_Report_M_SiteService")
public class T_Report_M_SiteService extends BaseService<T_Report_M_Site, Long> implements IT_Report_M_SiteService{

	private IT_Report_M_SiteDao t_Report_M_SiteDao;

	@Resource(name="t_Report_M_SiteDao")
	@Override
	public void setBaseDao(IDao<T_Report_M_Site, Long> baseDao) {
		this.t_Report_M_SiteDao = (IT_Report_M_SiteDao)baseDao;
		this.baseDao = baseDao;
	}











}