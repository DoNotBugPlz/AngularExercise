package com.skytech.project.report.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.report.dao.IT_Report_Goods_Detail_IndexDao;
import com.skytech.project.report.model.T_Report_Goods_Detail_Index;

@Repository("t_Report_Goods_Detail_IndexDao")
public class T_Report_Goods_Detail_IndexDao extends MainBaseDao<T_Report_Goods_Detail_Index, Long> implements IT_Report_Goods_Detail_IndexDao{

	
}