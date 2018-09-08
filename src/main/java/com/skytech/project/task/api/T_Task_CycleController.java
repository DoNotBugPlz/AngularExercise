package com.skytech.project.task.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_Task_CycleService;

@Controller
@RequestMapping("/T_task_cycle")
public class T_Task_CycleController{

	@Resource(name="t_Task_CycleService")
	private IT_Task_CycleService t_Task_CycleService;











}