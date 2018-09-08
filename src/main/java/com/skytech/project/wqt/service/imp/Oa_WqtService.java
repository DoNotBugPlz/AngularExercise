package com.skytech.project.wqt.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.wqt.dao.IOa_WqtDao;
import com.skytech.project.wqt.service.IOa_WqtService;
import com.skytech.project.wqt.model.Oa_Wqt;

import java.util.Map;

@Service("oa_WqtService")
public class Oa_WqtService extends BaseService<Oa_Wqt, Long> implements IOa_WqtService{

	private IOa_WqtDao oa_WqtDao;

	@Resource(name="oa_WqtDao")
	@Override
	public void setBaseDao(IDao<Oa_Wqt, Long> baseDao) {
		this.oa_WqtDao = (IOa_WqtDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public GridResult loadList(PageInfo pageInfo, Map map) {
		return oa_WqtDao.loadList(pageInfo,map);
	}
}