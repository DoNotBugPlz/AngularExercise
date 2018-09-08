package com.skytech.project.task.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.task.dao.IT_Task_CycleDao;
import com.skytech.project.task.model.T_Task_Cycle;

@Repository("t_Task_CycleDao")
public class T_Task_CycleDao extends MainBaseDao<T_Task_Cycle, Long> implements IT_Task_CycleDao{

	
}