package com.skytech.project.task.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_Task_IndexService;

@Controller
@RequestMapping("/T_task_index")
public class T_Task_IndexController{

	@Resource(name="t_Task_IndexService")
	private IT_Task_IndexService t_Task_IndexService;











}