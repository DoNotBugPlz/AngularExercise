package com.skytech.project.task.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_Task_M_SiteService;

@Controller
@RequestMapping("/T_task_m_site")
public class T_Task_M_SiteController{

	@Resource(name="t_Task_M_SiteService")
	private IT_Task_M_SiteService t_Task_M_SiteService;











}