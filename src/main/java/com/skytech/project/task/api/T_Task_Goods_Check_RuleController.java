package com.skytech.project.task.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_Task_Goods_Check_RuleService;

@Controller
@RequestMapping("/T_task_goods_check_rule")
public class T_Task_Goods_Check_RuleController{

	@Resource(name="t_Task_Goods_Check_RuleService")
	private IT_Task_Goods_Check_RuleService t_Task_Goods_Check_RuleService;











}