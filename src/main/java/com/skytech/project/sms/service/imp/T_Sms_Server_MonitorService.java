package com.skytech.project.sms.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.sms.dao.IT_Sms_Server_MonitorDao;
import com.skytech.project.sms.service.IT_Sms_Server_MonitorService;
import com.skytech.project.sms.model.T_Sms_Server_Monitor;

import java.util.Map;

@Service("t_Sms_Server_MonitorService")
public class T_Sms_Server_MonitorService extends BaseService<T_Sms_Server_Monitor, Long> implements IT_Sms_Server_MonitorService{

	private IT_Sms_Server_MonitorDao t_Sms_Server_MonitorDao;

	@Resource(name="t_Sms_Server_MonitorDao")
	@Override
	public void setBaseDao(IDao<T_Sms_Server_Monitor, Long> baseDao) {
		this.t_Sms_Server_MonitorDao = (IT_Sms_Server_MonitorDao)baseDao;
		this.baseDao = baseDao;
	}




	public GridResult search(PageInfo pageinfo, Map map) {
		return t_Sms_Server_MonitorDao.search(pageinfo, map);
	}






}