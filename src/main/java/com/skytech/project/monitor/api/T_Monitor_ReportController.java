package com.skytech.project.monitor.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.monitor.service.IT_Monitor_ReportService;

@Controller
@RequestMapping("/T_monitor_report")
public class T_Monitor_ReportController{

	@Resource(name="t_Monitor_ReportService")
	private IT_Monitor_ReportService t_Monitor_ReportService;











}