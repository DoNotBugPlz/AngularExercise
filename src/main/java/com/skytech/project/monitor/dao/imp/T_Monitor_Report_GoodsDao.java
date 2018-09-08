package com.skytech.project.monitor.dao.imp;

import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.monitor.dao.IT_Monitor_Report_GoodsDao;
import com.skytech.project.monitor.model.T_Monitor_Report_Goods;
import org.springframework.stereotype.Repository;

@Repository("t_Monitor_Report_GoodsDao")
public class T_Monitor_Report_GoodsDao extends MainBaseDao<T_Monitor_Report_Goods, Long> implements IT_Monitor_Report_GoodsDao{

	
}