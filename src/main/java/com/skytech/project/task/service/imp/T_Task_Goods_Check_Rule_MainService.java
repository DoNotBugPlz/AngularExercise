package com.skytech.project.task.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_Task_Goods_Check_Rule_MainDao;
import com.skytech.project.task.service.IT_Task_Goods_Check_Rule_MainService;
import com.skytech.project.task.model.T_Task_Goods_Check_Rule_Main;

@Service("t_Task_Goods_Check_Rule_MainService")
public class T_Task_Goods_Check_Rule_MainService extends BaseService<T_Task_Goods_Check_Rule_Main, Long> implements IT_Task_Goods_Check_Rule_MainService{

	private IT_Task_Goods_Check_Rule_MainDao t_Task_Goods_Check_Rule_MainDao;

	@Resource(name="t_Task_Goods_Check_Rule_MainDao")
	@Override
	public void setBaseDao(IDao<T_Task_Goods_Check_Rule_Main, Long> baseDao) {
		this.t_Task_Goods_Check_Rule_MainDao = (IT_Task_Goods_Check_Rule_MainDao)baseDao;
		this.baseDao = baseDao;
	}











}