package com.skytech.project.oa.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.oa.dao.IOa_LwDao;
import com.skytech.project.oa.service.IOa_LwService;
import com.skytech.project.oa.model.Oa_Lw;

import java.util.Map;

@Service("oa_LwService")
public class Oa_LwService extends BaseService<Oa_Lw, Long> implements IOa_LwService{

	private IOa_LwDao oa_LwDao;

	@Resource(name="oa_LwDao")
	@Override
	public void setBaseDao(IDao<Oa_Lw, Long> baseDao) {
		this.oa_LwDao = (IOa_LwDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public GridResult loadList(PageInfo pageInfo, Map map) {
		return oa_LwDao.loadList(pageInfo,map);
	}
}