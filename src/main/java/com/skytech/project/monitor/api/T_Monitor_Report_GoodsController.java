package com.skytech.project.monitor.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.monitor.service.IT_Monitor_Report_GoodsService;

@Controller
@RequestMapping("/T_monitor_report_goods")
public class T_Monitor_Report_GoodsController{

	@Resource(name="t_Monitor_Report_GoodsService")
	private IT_Monitor_Report_GoodsService t_Monitor_Report_GoodsService;











}