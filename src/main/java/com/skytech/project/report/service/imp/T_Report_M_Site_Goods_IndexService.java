package com.skytech.project.report.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.report.dao.IT_Report_M_Site_Goods_IndexDao;
import com.skytech.project.report.service.IT_Report_M_Site_Goods_IndexService;
import com.skytech.project.report.model.T_Report_M_Site_Goods_Index;

@Service("t_Report_M_Site_Goods_IndexService")
public class T_Report_M_Site_Goods_IndexService extends BaseService<T_Report_M_Site_Goods_Index, Long> implements IT_Report_M_Site_Goods_IndexService{

	private IT_Report_M_Site_Goods_IndexDao t_Report_M_Site_Goods_IndexDao;

	@Resource(name="t_Report_M_Site_Goods_IndexDao")
	@Override
	public void setBaseDao(IDao<T_Report_M_Site_Goods_Index, Long> baseDao) {
		this.t_Report_M_Site_Goods_IndexDao = (IT_Report_M_Site_Goods_IndexDao)baseDao;
		this.baseDao = baseDao;
	}











}