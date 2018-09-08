package com.skytech.project.task.api;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.task.service.IT_Task_M_Site_Goods_LinkService;

@Controller
@RequestMapping("/T_task_m_site_goods_link")
public class T_Task_M_Site_Goods_LinkController{

	@Resource(name="t_Task_M_Site_Goods_LinkService")
	private IT_Task_M_Site_Goods_LinkService t_Task_M_Site_Goods_LinkService;











}