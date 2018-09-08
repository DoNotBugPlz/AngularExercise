package com.skytech.project.office.notice.api;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.ResultJO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.office.notice.service.IT_Notice_ObjectService;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/t_notice_object")
public class T_Notice_ObjectController{

	@Resource(name="t_Notice_ObjectService")
	private IT_Notice_ObjectService t_Notice_ObjectService;


}