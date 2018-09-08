package com.skytech.project.monitor.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.monitor.dao.IT_Monitor_Report_ClassDao;
import com.skytech.project.monitor.model.T_Monitor_Report_Class;

@Repository("t_Monitor_Report_ClassDao")
public class T_Monitor_Report_ClassDao extends MainBaseDao<T_Monitor_Report_Class, Long> implements IT_Monitor_Report_ClassDao{

	
}