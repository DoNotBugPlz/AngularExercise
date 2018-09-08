package com.skytech.project.sms.api;

import javax.annotation.Resource;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.project.sms.model.T_Sms_Server_Monitor;
import com.sun.jdi.LongValue;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.sms.service.IT_Sms_Server_MonitorService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/T_sms_server_monitor")
public class T_Sms_Server_MonitorController{

	@Resource(name="t_Sms_Server_MonitorService")
	private IT_Sms_Server_MonitorService t_Sms_Server_MonitorService;


	@RequestMapping(value = {"/list"})
	@ResponseBody
	public GridResult search(@RequestParam(value="menu_id",required=false) String menu_id,
							 @RequestParam(value="status",required=false) String status,
							 @RequestParam(value="earlysituation",required=false) String earlysituation,
							 PageInfo pageInfo) {
		Map map  = new HashMap();
		map.put("menu_id",menu_id);
		map.put("status",status);
		map.put("earlysituation",earlysituation);
		GridResult List = t_Sms_Server_MonitorService.search(pageInfo, map);


		return t_Sms_Server_MonitorService.search(pageInfo, map);
	}

	/**
	 * 停用启用
	 * @return
	 */
	@RequestMapping(value="/updateStatus",method = RequestMethod.POST)
	@ResponseBody
	public ResultJO updateStatus(@RequestBody Map paramMap) {
		String ids = StringUtil.getStr(paramMap.get("ids")) ;
		String status = StringUtil.getStr(paramMap.get("status")) ;
		T_Sms_Server_Monitor smsServerMonitor = new  T_Sms_Server_Monitor();
		smsServerMonitor.setStatus(Integer.parseInt(status));
		smsServerMonitor.setId(Long.valueOf(ids));
		t_Sms_Server_MonitorService.saveOrUpdateWithNotNullProperties(smsServerMonitor);
		return ResultJO.getDefaultResult(null, "修改成功！");
	}






}