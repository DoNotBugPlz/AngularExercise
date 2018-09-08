package com.skytech.project.masterplate.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.masterplate.dao.IT_Masterplate_GoodsDao;
import com.skytech.project.masterplate.service.IT_Masterplate_GoodsService;
import com.skytech.project.masterplate.model.T_Masterplate_Goods;

@Service("t_Masterplate_GoodsService")
public class T_Masterplate_GoodsService extends BaseService<T_Masterplate_Goods, Long> implements IT_Masterplate_GoodsService{

	private IT_Masterplate_GoodsDao t_Masterplate_GoodsDao;

	@Resource(name="t_Masterplate_GoodsDao")
	@Override
	public void setBaseDao(IDao<T_Masterplate_Goods, Long> baseDao) {
		this.t_Masterplate_GoodsDao = (IT_Masterplate_GoodsDao)baseDao;
		this.baseDao = baseDao;
	}











}