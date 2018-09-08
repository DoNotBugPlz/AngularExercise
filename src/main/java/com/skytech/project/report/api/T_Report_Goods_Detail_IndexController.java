package com.skytech.project.report.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.report.service.IT_Report_Goods_Detail_IndexService;

@Controller
@RequestMapping("/T_report_goods_detail_index")
public class T_Report_Goods_Detail_IndexController{

	@Resource(name="t_Report_Goods_Detail_IndexService")
	private IT_Report_Goods_Detail_IndexService t_Report_Goods_Detail_IndexService;











}