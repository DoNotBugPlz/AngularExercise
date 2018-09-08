package com.skytech.project.task.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.task.dao.IT_Task_Goods_Check_RuleDao;
import com.skytech.project.task.model.T_Task_Goods_Check_Rule;

@Repository("t_Task_Goods_Check_RuleDao")
public class T_Task_Goods_Check_RuleDao extends MainBaseDao<T_Task_Goods_Check_Rule, Long> implements IT_Task_Goods_Check_RuleDao{

	
}