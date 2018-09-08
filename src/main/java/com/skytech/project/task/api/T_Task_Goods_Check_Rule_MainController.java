package com.skytech.project.task.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_Task_Goods_Check_Rule_MainService;

@Controller
@RequestMapping("/T_task_goods_check_rule_main")
public class T_Task_Goods_Check_Rule_MainController{

	@Resource(name="t_Task_Goods_Check_Rule_MainService")
	private IT_Task_Goods_Check_Rule_MainService t_Task_Goods_Check_Rule_MainService;











}