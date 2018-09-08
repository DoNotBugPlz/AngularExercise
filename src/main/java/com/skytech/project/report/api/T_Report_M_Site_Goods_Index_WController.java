package com.skytech.project.report.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.report.service.IT_Report_M_Site_Goods_Index_WService;

@Controller
@RequestMapping("/T_report_m_site_goods_index_w")
public class T_Report_M_Site_Goods_Index_WController{

	@Resource(name="t_Report_M_Site_Goods_Index_WService")
	private IT_Report_M_Site_Goods_Index_WService t_Report_M_Site_Goods_Index_WService;











}