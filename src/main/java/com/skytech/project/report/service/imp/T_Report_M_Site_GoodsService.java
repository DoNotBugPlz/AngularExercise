package com.skytech.project.report.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.report.dao.IT_Report_M_Site_GoodsDao;
import com.skytech.project.report.service.IT_Report_M_Site_GoodsService;
import com.skytech.project.report.model.T_Report_M_Site_Goods;

@Service("t_Report_M_Site_GoodsService")
public class T_Report_M_Site_GoodsService extends BaseService<T_Report_M_Site_Goods, Long> implements IT_Report_M_Site_GoodsService{

	private IT_Report_M_Site_GoodsDao t_Report_M_Site_GoodsDao;

	@Resource(name="t_Report_M_Site_GoodsDao")
	@Override
	public void setBaseDao(IDao<T_Report_M_Site_Goods, Long> baseDao) {
		this.t_Report_M_Site_GoodsDao = (IT_Report_M_Site_GoodsDao)baseDao;
		this.baseDao = baseDao;
	}











}