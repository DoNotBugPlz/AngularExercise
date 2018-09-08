package com.skytech.project.sms.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.sms.dao.IT_SensitivewordDao;
import com.skytech.project.sms.service.IT_SensitivewordService;
import com.skytech.project.sms.model.T_Sensitiveword;

import java.util.Map;

@Service("t_SensitivewordService")
public class T_SensitivewordService extends BaseService<T_Sensitiveword, Long> implements IT_SensitivewordService{

	private IT_SensitivewordDao t_SensitivewordDao;

	@Resource(name="t_SensitivewordDao")
	@Override
	public void setBaseDao(IDao<T_Sensitiveword, Long> baseDao) {
		this.t_SensitivewordDao = (IT_SensitivewordDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public GridResult search(PageInfo pageinfo, Map map) {
		return t_SensitivewordDao.search(pageinfo, map);
	}








}