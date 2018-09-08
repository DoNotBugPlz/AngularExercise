package com.skytech.project.task.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_Task_GoodsService;

@Controller
@RequestMapping("/T_task_goods")
public class T_Task_GoodsController{

	@Resource(name="t_Task_GoodsService")
	private IT_Task_GoodsService t_Task_GoodsService;











}