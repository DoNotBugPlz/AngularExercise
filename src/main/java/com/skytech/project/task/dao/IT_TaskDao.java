package com.skytech.project.task.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.task.model.T_Task;

import java.util.Map;

public interface IT_TaskDao extends IDao<T_Task, Long> {
    GridResult loadTaskList(PageInfo pageInfo, Map map);

	
}