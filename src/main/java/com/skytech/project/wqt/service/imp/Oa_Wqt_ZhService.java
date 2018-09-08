package com.skytech.project.wqt.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.wqt.dao.IOa_Wqt_ZhDao;
import com.skytech.project.wqt.service.IOa_Wqt_ZhService;
import com.skytech.project.wqt.model.Oa_Wqt_Zh;

@Service("oa_Wqt_ZhService")
public class Oa_Wqt_ZhService extends BaseService<Oa_Wqt_Zh, Long> implements IOa_Wqt_ZhService{

	private IOa_Wqt_ZhDao oa_Wqt_ZhDao;

	@Resource(name="oa_Wqt_ZhDao")
	@Override
	public void setBaseDao(IDao<Oa_Wqt_Zh, Long> baseDao) {
		this.oa_Wqt_ZhDao = (IOa_Wqt_ZhDao)baseDao;
		this.baseDao = baseDao;
	}











}