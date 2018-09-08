package com.skytech.project.organisation.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.organisation.dao.ICf_User_SignDao;
import com.skytech.project.organisation.service.ICf_User_SignService;
import com.skytech.project.organisation.model.Cf_User_Sign;

import java.util.Map;

@Service("cf_User_SignService")
public class Cf_User_SignService extends BaseService<Cf_User_Sign, String> implements ICf_User_SignService{

	private ICf_User_SignDao cf_User_SignDao;

	@Resource(name="cf_User_SignDao")
	@Override
	public void setBaseDao(IDao<Cf_User_Sign, String> baseDao) {
		this.cf_User_SignDao = (ICf_User_SignDao)baseDao;
		this.baseDao = baseDao;
	}

	/**
	 * 查询采价员统计列表，可以传查询条件
	 */
	@Override
	public GridResult search(PageInfo pageinfo, Map map) {
		return cf_User_SignDao.search(pageinfo, map);
	}

}