package com.skytech.project.report.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.report.dao.IT_Report_M_Site_GoodsDao;
import com.skytech.project.report.model.T_Report_M_Site_Goods;

@Repository("t_Report_M_Site_GoodsDao")
public class T_Report_M_Site_GoodsDao extends MainBaseDao<T_Report_M_Site_Goods, Long> implements IT_Report_M_Site_GoodsDao{

	
}