package com.skytech.project.task.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_Task_GoodsDao;
import com.skytech.project.task.service.IT_Task_GoodsService;
import com.skytech.project.task.model.T_Task_Goods;

@Service("t_Task_GoodsService")
public class T_Task_GoodsService extends BaseService<T_Task_Goods, Long> implements IT_Task_GoodsService{

	private IT_Task_GoodsDao t_Task_GoodsDao;

	@Resource(name="t_Task_GoodsDao")
	@Override
	public void setBaseDao(IDao<T_Task_Goods, Long> baseDao) {
		this.t_Task_GoodsDao = (IT_Task_GoodsDao)baseDao;
		this.baseDao = baseDao;
	}











}