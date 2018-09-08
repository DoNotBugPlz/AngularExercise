package com.skytech.project.monitor.dao.imp;

import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.monitor.dao.IT_Monitor_ReportDao;
import com.skytech.project.monitor.model.T_Monitor_Report;
import org.springframework.stereotype.Repository;

@Repository("t_Monitor_ReportDao")
public class T_Monitor_ReportDao extends MainBaseDao<T_Monitor_Report, Long> implements IT_Monitor_ReportDao{

	
}