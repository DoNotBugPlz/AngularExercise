package com.skytech.project.matter.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.matter.service.IT_Matter_Monitor_GreatService;

@Controller
@RequestMapping("/T_matter_monitor_great")
public class T_Matter_Monitor_GreatController{

	@Resource(name="t_Matter_Monitor_GreatService")
	private IT_Matter_Monitor_GreatService t_Matter_Monitor_GreatService;











}