package com.skytech.project.monitor.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.monitor.service.IT_Monitor_Report_ClassService;

@Controller
@RequestMapping("/T_monitor_report_class")
public class T_Monitor_Report_ClassController{

	@Resource(name="t_Monitor_Report_ClassService")
	private IT_Monitor_Report_ClassService t_Monitor_Report_ClassService;











}