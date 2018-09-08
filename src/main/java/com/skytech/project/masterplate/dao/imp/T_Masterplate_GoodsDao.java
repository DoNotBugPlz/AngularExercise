package com.skytech.project.masterplate.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.masterplate.dao.IT_Masterplate_GoodsDao;
import com.skytech.project.masterplate.model.T_Masterplate_Goods;

@Repository("t_Masterplate_GoodsDao")
public class T_Masterplate_GoodsDao extends MainBaseDao<T_Masterplate_Goods, Long> implements IT_Masterplate_GoodsDao{

	
}