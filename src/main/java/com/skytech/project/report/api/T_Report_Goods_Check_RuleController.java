package com.skytech.project.report.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.report.service.IT_Report_Goods_Check_RuleService;

@Controller
@RequestMapping("/T_report_goods_check_rule")
public class T_Report_Goods_Check_RuleController{

	@Resource(name="t_Report_Goods_Check_RuleService")
	private IT_Report_Goods_Check_RuleService t_Report_Goods_Check_RuleService;











}