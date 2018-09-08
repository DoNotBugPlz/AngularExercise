package com.skytech.project.report.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.report.service.IT_Report_Goods_Check_Rule_MainService;

@Controller
@RequestMapping("/T_report_goods_check_rule_main")
public class T_Report_Goods_Check_Rule_MainController{

	@Resource(name="t_Report_Goods_Check_Rule_MainService")
	private IT_Report_Goods_Check_Rule_MainService t_Report_Goods_Check_Rule_MainService;











}