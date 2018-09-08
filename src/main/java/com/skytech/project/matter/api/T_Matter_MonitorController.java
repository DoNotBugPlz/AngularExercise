package com.skytech.project.matter.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.matter.service.IT_Matter_MonitorService;

@Controller
@RequestMapping("/T_matter_monitor")
public class T_Matter_MonitorController{

	@Resource(name="t_Matter_MonitorService")
	private IT_Matter_MonitorService t_Matter_MonitorService;











}