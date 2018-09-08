package com.skytech.project.matter.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.matter.dao.IT_Matter_MonitorDao;
import com.skytech.project.matter.model.T_Matter_Monitor;

@Repository("t_Matter_MonitorDao")
public class T_Matter_MonitorDao extends MainBaseDao<T_Matter_Monitor, Long> implements IT_Matter_MonitorDao{

	
}