package com.skytech.project.monitorTaskChange.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.monitorTaskChange.dao.IT_Monitor_Task_ChangeDao;
import com.skytech.project.monitorTaskChange.model.T_Monitor_Task_Change;

@Repository("t_Monitor_Task_ChangeDao")
public class T_Monitor_Task_ChangeDao extends MainBaseDao<T_Monitor_Task_Change, Long> implements IT_Monitor_Task_ChangeDao{

	
}