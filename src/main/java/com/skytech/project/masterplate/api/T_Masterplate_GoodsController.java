package com.skytech.project.masterplate.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.masterplate.service.IT_Masterplate_GoodsService;

@Controller
@RequestMapping("/T_masterplate_goods")
public class T_Masterplate_GoodsController{

	@Resource(name="t_Masterplate_GoodsService")
	private IT_Masterplate_GoodsService t_Masterplate_GoodsService;











}