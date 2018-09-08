package com.skytech.project.task.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.task.dao.IT_Task_M_SiteDao;
import com.skytech.project.task.model.T_Task_M_Site;

@Repository("t_Task_M_SiteDao")
public class T_Task_M_SiteDao extends MainBaseDao<T_Task_M_Site, Long> implements IT_Task_M_SiteDao{

	
}