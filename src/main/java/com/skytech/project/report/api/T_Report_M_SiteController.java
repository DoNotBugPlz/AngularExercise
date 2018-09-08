package com.skytech.project.report.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.report.service.IT_Report_M_SiteService;

@Controller
@RequestMapping("/T_report_m_site")
public class T_Report_M_SiteController{

	@Resource(name="t_Report_M_SiteService")
	private IT_Report_M_SiteService t_Report_M_SiteService;











}