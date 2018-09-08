package com.skytech.project.task.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.task.dao.IT_Task_M_Site_Goods_LinkDao;
import com.skytech.project.task.service.IT_Task_M_Site_Goods_LinkService;
import com.skytech.project.task.model.T_Task_M_Site_Goods_Link;

@Service("t_Task_M_Site_Goods_LinkService")
public class T_Task_M_Site_Goods_LinkService extends BaseService<T_Task_M_Site_Goods_Link, Long> implements IT_Task_M_Site_Goods_LinkService{

	private IT_Task_M_Site_Goods_LinkDao t_Task_M_Site_Goods_LinkDao;

	@Resource(name="t_Task_M_Site_Goods_LinkDao")
	@Override
	public void setBaseDao(IDao<T_Task_M_Site_Goods_Link, Long> baseDao) {
		this.t_Task_M_Site_Goods_LinkDao = (IT_Task_M_Site_Goods_LinkDao)baseDao;
		this.baseDao = baseDao;
	}











}