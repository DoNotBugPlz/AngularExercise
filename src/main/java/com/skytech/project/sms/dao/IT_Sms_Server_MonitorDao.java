package com.skytech.project.sms.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.sms.model.T_Sms_Server_Monitor;

import java.util.Map;

public interface IT_Sms_Server_MonitorDao extends IDao<T_Sms_Server_Monitor, Long> {

    GridResult search(PageInfo pageinfo, Map map);
	
}