package com.skytech.project.report.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.report.dao.IT_Report_Goods_DetailDao;
import com.skytech.project.report.service.IT_Report_Goods_DetailService;
import com.skytech.project.report.model.T_Report_Goods_Detail;

@Service("t_Report_Goods_DetailService")
public class T_Report_Goods_DetailService extends BaseService<T_Report_Goods_Detail, Long> implements IT_Report_Goods_DetailService{

	private IT_Report_Goods_DetailDao t_Report_Goods_DetailDao;

	@Resource(name="t_Report_Goods_DetailDao")
	@Override
	public void setBaseDao(IDao<T_Report_Goods_Detail, Long> baseDao) {
		this.t_Report_Goods_DetailDao = (IT_Report_Goods_DetailDao)baseDao;
		this.baseDao = baseDao;
	}











}