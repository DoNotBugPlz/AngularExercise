package com.skytech.project.report.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.report.service.IT_Report_Goods_DetailService;

@Controller
@RequestMapping("/T_report_goods_detail")
public class T_Report_Goods_DetailController{

	@Resource(name="t_Report_Goods_DetailService")
	private IT_Report_Goods_DetailService t_Report_Goods_DetailService;











}