package com.skytech.project.sms.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.sms.dao.IT_Sms_ObjectDao;
import com.skytech.project.sms.service.IT_Sms_ObjectService;
import com.skytech.project.sms.model.T_Sms_Object;

@Service("t_Sms_ObjectService")
public class T_Sms_ObjectService extends BaseService<T_Sms_Object, String> implements IT_Sms_ObjectService{

	private IT_Sms_ObjectDao t_Sms_ObjectDao;

	@Resource(name="t_Sms_ObjectDao")
	@Override
	public void setBaseDao(IDao<T_Sms_Object, String> baseDao) {
		this.t_Sms_ObjectDao = (IT_Sms_ObjectDao)baseDao;
		this.baseDao = baseDao;
	}











}