package com.skytech.project.task.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.task.dao.IT_Task_IndexDao;
import com.skytech.project.task.model.T_Task_Index;

@Repository("t_Task_IndexDao")
public class T_Task_IndexDao extends MainBaseDao<T_Task_Index, Long> implements IT_Task_IndexDao{

	
}