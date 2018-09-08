package com.skytech.project.sms.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.sms.dao.IT_SmsDao;
import com.skytech.project.sms.service.IT_SmsService;
import com.skytech.project.sms.model.T_Sms;

import java.util.List;
import java.util.Map;

@Service("t_SmsService")
public class T_SmsService extends BaseService<T_Sms, Long> implements IT_SmsService{

	private IT_SmsDao t_SmsDao;

	@Resource(name="t_SmsDao")
	@Override
	public void setBaseDao(IDao<T_Sms, Long> baseDao) {
		this.t_SmsDao = (IT_SmsDao)baseDao;
		this.baseDao = baseDao;
	}

	public GridResult search(PageInfo pageinfo, Map map) {
		return t_SmsDao.search(pageinfo, map);
	}



	public List loadSms(String id) {
		return t_SmsDao.loadSms(id);
	}








}