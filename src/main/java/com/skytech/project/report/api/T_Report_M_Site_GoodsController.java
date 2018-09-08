package com.skytech.project.report.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.report.service.IT_Report_M_Site_GoodsService;

@Controller
@RequestMapping("/T_report_m_site_goods")
public class T_Report_M_Site_GoodsController{

	@Resource(name="t_Report_M_Site_GoodsService")
	private IT_Report_M_Site_GoodsService t_Report_M_Site_GoodsService;











}