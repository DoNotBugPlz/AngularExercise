package com.skytech.project.report.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.report.dao.IT_Report_M_SiteDao;
import com.skytech.project.report.model.T_Report_M_Site;

@Repository("t_Report_M_SiteDao")
public class T_Report_M_SiteDao extends MainBaseDao<T_Report_M_Site, Long> implements IT_Report_M_SiteDao{

	
}