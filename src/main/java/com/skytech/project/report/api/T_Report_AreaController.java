package com.skytech.project.report.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.report.service.IT_Report_AreaService;

@Controller
@RequestMapping("/T_report_area")
public class T_Report_AreaController{

	@Resource(name="t_Report_AreaService")
	private IT_Report_AreaService t_Report_AreaService;











}