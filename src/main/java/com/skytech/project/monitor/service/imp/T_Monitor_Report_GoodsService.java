package com.skytech.project.monitor.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.monitor.dao.IT_Monitor_Report_GoodsDao;
import com.skytech.project.monitor.service.IT_Monitor_Report_GoodsService;
import com.skytech.project.monitor.model.T_Monitor_Report_Goods;

@Service("t_Monitor_Report_GoodsService")
public class T_Monitor_Report_GoodsService extends BaseService<T_Monitor_Report_Goods, Long> implements IT_Monitor_Report_GoodsService{

	private IT_Monitor_Report_GoodsDao t_Monitor_Report_GoodsDao;

	@Resource(name="t_Monitor_Report_GoodsDao")
	@Override
	public void setBaseDao(IDao<T_Monitor_Report_Goods, Long> baseDao) {
		this.t_Monitor_Report_GoodsDao = (IT_Monitor_Report_GoodsDao)baseDao;
		this.baseDao = baseDao;
	}











}