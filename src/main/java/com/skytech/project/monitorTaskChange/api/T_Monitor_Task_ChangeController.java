package com.skytech.project.monitorTaskChange.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.monitorTaskChange.service.IT_Monitor_Task_ChangeService;

@Controller
@RequestMapping("/T_monitor_task_change")
public class T_Monitor_Task_ChangeController{

	@Resource(name="t_Monitor_Task_ChangeService")
	private IT_Monitor_Task_ChangeService t_Monitor_Task_ChangeService;











}