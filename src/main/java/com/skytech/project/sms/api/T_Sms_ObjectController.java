package com.skytech.project.sms.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.sms.service.IT_Sms_ObjectService;

@Controller
@RequestMapping("/T_sms_object")
public class T_Sms_ObjectController{

	@Resource(name="t_Sms_ObjectService")
	private IT_Sms_ObjectService t_Sms_ObjectService;











}