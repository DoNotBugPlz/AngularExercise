package com.skytech.project.task.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_Task_PushService;

@Controller
@RequestMapping("/T_task_push")
public class T_Task_PushController{

	@Resource(name="t_Task_PushService")
	private IT_Task_PushService t_Task_PushService;











}