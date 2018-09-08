package com.skytech.project.wqt.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.wqt.service.IOa_Wqt_ZhService;

@Controller
@RequestMapping("/Oa_wqt_zh")
public class Oa_Wqt_ZhController{

	@Resource(name="oa_Wqt_ZhService")
	private IOa_Wqt_ZhService oa_Wqt_ZhService;











}