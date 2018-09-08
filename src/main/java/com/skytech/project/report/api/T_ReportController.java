package com.skytech.project.report.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.report.service.IT_ReportService;

@Controller
@RequestMapping("/T_report")
public class T_ReportController{

	@Resource(name="t_ReportService")
	private IT_ReportService t_ReportService;











}