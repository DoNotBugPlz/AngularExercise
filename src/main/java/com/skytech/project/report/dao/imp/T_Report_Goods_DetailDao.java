package com.skytech.project.report.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.report.dao.IT_Report_Goods_DetailDao;
import com.skytech.project.report.model.T_Report_Goods_Detail;

@Repository("t_Report_Goods_DetailDao")
public class T_Report_Goods_DetailDao extends MainBaseDao<T_Report_Goods_Detail, Long> implements IT_Report_Goods_DetailDao{

	
}