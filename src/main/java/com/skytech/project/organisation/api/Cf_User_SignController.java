package com.skytech.project.organisation.api;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.project.organisation.service.ICf_User_SignService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/Cf_user_sign")
public class Cf_User_SignController{

	@Resource(name="cf_User_SignService")
	private ICf_User_SignService cf_User_SignService;

	/**
	 * 查询采价员统计列表
	 */
	@RequestMapping(value = {"/getListByParam"})
	@ResponseBody
	public GridResult search(@RequestParam(value="chinaname",required=false) String chinaname,
							 @RequestParam(value="start_date",required=false) String start_date,
							 @RequestParam(value="end_date",required=false) String end_date,
							 @RequestParam(value="monitor_point_id",required=false) String monitor_point_id,
							 @RequestParam(value="delstatus",required=false) String delstatus,
							 PageInfo pageInfo) {
		Map map  = new HashMap();
		map.put("chinaname",chinaname);
		map.put("start_date",start_date);
		map.put("end_date",end_date);
		map.put("monitor_point_id",monitor_point_id);
		map.put("delstatus",delstatus);
		return cf_User_SignService.search(pageInfo,map);
	}

}