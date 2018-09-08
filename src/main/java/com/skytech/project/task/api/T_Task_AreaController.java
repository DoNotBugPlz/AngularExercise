package com.skytech.project.task.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_Task_AreaService;

@Controller
@RequestMapping("/T_task_area")
public class T_Task_AreaController{

	@Resource(name="t_Task_AreaService")
	private IT_Task_AreaService t_Task_AreaService;











}