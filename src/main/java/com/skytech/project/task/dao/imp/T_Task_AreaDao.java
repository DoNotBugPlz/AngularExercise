package com.skytech.project.task.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.task.dao.IT_Task_AreaDao;
import com.skytech.project.task.model.T_Task_Area;

@Repository("t_Task_AreaDao")
public class T_Task_AreaDao extends MainBaseDao<T_Task_Area, Long> implements IT_Task_AreaDao{

	
}