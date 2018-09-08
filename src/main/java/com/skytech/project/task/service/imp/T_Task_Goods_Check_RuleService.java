package com.skytech.project.task.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_Task_Goods_Check_RuleDao;
import com.skytech.project.task.service.IT_Task_Goods_Check_RuleService;
import com.skytech.project.task.model.T_Task_Goods_Check_Rule;

@Service("t_Task_Goods_Check_RuleService")
public class T_Task_Goods_Check_RuleService extends BaseService<T_Task_Goods_Check_Rule, Long> implements IT_Task_Goods_Check_RuleService{

	private IT_Task_Goods_Check_RuleDao t_Task_Goods_Check_RuleDao;

	@Resource(name="t_Task_Goods_Check_RuleDao")
	@Override
	public void setBaseDao(IDao<T_Task_Goods_Check_Rule, Long> baseDao) {
		this.t_Task_Goods_Check_RuleDao = (IT_Task_Goods_Check_RuleDao)baseDao;
		this.baseDao = baseDao;
	}











}