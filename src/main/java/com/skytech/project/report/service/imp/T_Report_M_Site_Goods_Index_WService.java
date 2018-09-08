package com.skytech.project.report.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.report.dao.IT_Report_M_Site_Goods_Index_WDao;
import com.skytech.project.report.service.IT_Report_M_Site_Goods_Index_WService;
import com.skytech.project.report.model.T_Report_M_Site_Goods_Index_W;

@Service("t_Report_M_Site_Goods_Index_WService")
public class T_Report_M_Site_Goods_Index_WService extends BaseService<T_Report_M_Site_Goods_Index_W, Long> implements IT_Report_M_Site_Goods_Index_WService{

	private IT_Report_M_Site_Goods_Index_WDao t_Report_M_Site_Goods_Index_WDao;

	@Resource(name="t_Report_M_Site_Goods_Index_WDao")
	@Override
	public void setBaseDao(IDao<T_Report_M_Site_Goods_Index_W, Long> baseDao) {
		this.t_Report_M_Site_Goods_Index_WDao = (IT_Report_M_Site_Goods_Index_WDao)baseDao;
		this.baseDao = baseDao;
	}











}