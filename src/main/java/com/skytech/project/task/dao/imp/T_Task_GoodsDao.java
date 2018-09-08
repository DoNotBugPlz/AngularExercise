package com.skytech.project.task.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.task.dao.IT_Task_GoodsDao;
import com.skytech.project.task.model.T_Task_Goods;

@Repository("t_Task_GoodsDao")
public class T_Task_GoodsDao extends MainBaseDao<T_Task_Goods, Long> implements IT_Task_GoodsDao{

	
}