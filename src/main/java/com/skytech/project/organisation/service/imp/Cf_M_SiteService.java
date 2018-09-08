package com.skytech.project.organisation.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.organisation.dao.ICf_M_SiteDao;
import com.skytech.project.organisation.service.ICf_M_SiteService;
import com.skytech.project.organisation.model.Cf_M_Site;

import java.util.Map;

@Service("cf_M_SiteService")
public class Cf_M_SiteService extends BaseService<Cf_M_Site, Long> implements ICf_M_SiteService{

	private ICf_M_SiteDao cf_M_SiteDao;

	@Resource(name="cf_M_SiteDao")
	@Override
	public void setBaseDao(IDao<Cf_M_Site, Long> baseDao) {
		this.cf_M_SiteDao = (ICf_M_SiteDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public GridResult LoadList(PageInfo pageInfo, Map map) {
		return cf_M_SiteDao.LoadList(pageInfo,map);
	}
}