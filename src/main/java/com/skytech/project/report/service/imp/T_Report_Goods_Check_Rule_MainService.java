package com.skytech.project.report.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.report.dao.IT_Report_Goods_Check_Rule_MainDao;
import com.skytech.project.report.service.IT_Report_Goods_Check_Rule_MainService;
import com.skytech.project.report.model.T_Report_Goods_Check_Rule_Main;

@Service("t_Report_Goods_Check_Rule_MainService")
public class T_Report_Goods_Check_Rule_MainService extends BaseService<T_Report_Goods_Check_Rule_Main, Long> implements IT_Report_Goods_Check_Rule_MainService{

	private IT_Report_Goods_Check_Rule_MainDao t_Report_Goods_Check_Rule_MainDao;

	@Resource(name="t_Report_Goods_Check_Rule_MainDao")
	@Override
	public void setBaseDao(IDao<T_Report_Goods_Check_Rule_Main, Long> baseDao) {
		this.t_Report_Goods_Check_Rule_MainDao = (IT_Report_Goods_Check_Rule_MainDao)baseDao;
		this.baseDao = baseDao;
	}











}