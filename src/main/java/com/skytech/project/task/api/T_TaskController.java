package com.skytech.project.task.api;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_TaskService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_task")
public class T_TaskController{

	@Resource(name="t_TaskService")
	private IT_TaskService t_TaskService;

	//加载右侧列表
	@ResponseBody
	@RequestMapping(value = {"/loadTaskList"})
	public GridResult loadTaskList(
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "task_type", required = false) String task_type,
			@RequestParam(value = "task_level", required = false) String task_level,
			@RequestParam(value = "task_status", required = false) String task_status,
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("name",name);
		map.put("task_type",task_type);
		map.put("task_level",task_level);
		map.put("task_status",task_status);
		return t_TaskService.loadTaskList(pageInfo,map);
	}




}