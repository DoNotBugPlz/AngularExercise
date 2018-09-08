package com.skytech.project.oa.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.oa.dao.IOa_FwDao;
import com.skytech.project.oa.service.IOa_FwService;
import com.skytech.project.oa.model.Oa_Fw;

import java.util.Map;

@Service("oa_FwService")
public class Oa_FwService extends BaseService<Oa_Fw, Long> implements IOa_FwService{

	private IOa_FwDao oa_FwDao;

	@Resource(name="oa_FwDao")
	@Override
	public void setBaseDao(IDao<Oa_Fw, Long> baseDao) {
		this.oa_FwDao = (IOa_FwDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public GridResult loadList(PageInfo pageInfo, Map map) {
		return oa_FwDao.loadList(pageInfo,map);
	}
}