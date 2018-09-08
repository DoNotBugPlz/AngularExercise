package com.skytech.project.organisation.api;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.organisation.service.ICf_M_SiteService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/Cf_m_site")
public class Cf_M_SiteController{

	@Resource(name="cf_M_SiteService")
	private ICf_M_SiteService cf_M_SiteService;



	/**
	 * 查询
	 * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
	 * @return GridResult
	 */
	@RequestMapping(value = {"/LoadList"})
	@ResponseBody
	public GridResult LoadList(
			@RequestParam(value = "name", required = false) String name, // 名称
			@RequestParam(value = "dept_ext_id", required = false) String dept_ext_id, // 名称
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("name",name);
		map.put("dept_ext_id",dept_ext_id);
		return cf_M_SiteService.LoadList(pageInfo, map);
	}












}