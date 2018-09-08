package com.skytech.project.report.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.report.dao.IT_Report_AreaDao;
import com.skytech.project.report.model.T_Report_Area;

@Repository("t_Report_AreaDao")
public class T_Report_AreaDao extends MainBaseDao<T_Report_Area, Long> implements IT_Report_AreaDao{

	
}