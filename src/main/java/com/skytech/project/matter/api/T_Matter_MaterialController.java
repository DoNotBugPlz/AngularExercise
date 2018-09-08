package com.skytech.project.matter.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.matter.service.IT_Matter_MaterialService;

@Controller
@RequestMapping("/T_matter_material")
public class T_Matter_MaterialController{

	@Resource(name="t_Matter_MaterialService")
	private IT_Matter_MaterialService t_Matter_MaterialService;











}