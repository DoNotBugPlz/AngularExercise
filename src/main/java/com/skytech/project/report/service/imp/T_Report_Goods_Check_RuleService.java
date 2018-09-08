package com.skytech.project.report.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.report.dao.IT_Report_Goods_Check_RuleDao;
import com.skytech.project.report.service.IT_Report_Goods_Check_RuleService;
import com.skytech.project.report.model.T_Report_Goods_Check_Rule;

@Service("t_Report_Goods_Check_RuleService")
public class T_Report_Goods_Check_RuleService extends BaseService<T_Report_Goods_Check_Rule, Long> implements IT_Report_Goods_Check_RuleService{

	private IT_Report_Goods_Check_RuleDao t_Report_Goods_Check_RuleDao;

	@Resource(name="t_Report_Goods_Check_RuleDao")
	@Override
	public void setBaseDao(IDao<T_Report_Goods_Check_Rule, Long> baseDao) {
		this.t_Report_Goods_Check_RuleDao = (IT_Report_Goods_Check_RuleDao)baseDao;
		this.baseDao = baseDao;
	}











}