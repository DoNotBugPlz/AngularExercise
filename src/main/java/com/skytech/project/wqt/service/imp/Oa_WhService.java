package com.skytech.project.wqt.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.wqt.dao.IOa_WhDao;
import com.skytech.project.wqt.service.IOa_WhService;
import com.skytech.project.wqt.model.Oa_Wh;

import java.util.Map;

@Service("oa_WhService")
public class Oa_WhService extends BaseService<Oa_Wh, Long> implements IOa_WhService{

	private IOa_WhDao oa_WhDao;

	@Resource(name="oa_WhDao")
	@Override
	public void setBaseDao(IDao<Oa_Wh, Long> baseDao) {
		this.oa_WhDao = (IOa_WhDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public GridResult loadList(PageInfo pageInfo, Map map) {
		return oa_WhDao.loadList(pageInfo,map);
	}
}