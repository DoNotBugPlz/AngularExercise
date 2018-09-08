package com.skytech.project.task.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.task.model.T_Task;

import java.util.Map;

public interface IT_TaskService extends IBaseService<T_Task, Long> {

    GridResult loadTaskList(PageInfo pageInfo, Map map);
}