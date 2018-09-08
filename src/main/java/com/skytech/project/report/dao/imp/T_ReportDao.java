package com.skytech.project.report.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.report.dao.IT_ReportDao;
import com.skytech.project.report.model.T_Report;

@Repository("t_ReportDao")
public class T_ReportDao extends MainBaseDao<T_Report, Long> implements IT_ReportDao{

	
}