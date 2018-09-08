package com.skytech.project.sms.api;

import javax.annotation.Resource;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.project.notice.model.Notice;
import com.skytech.project.sms.model.T_Sensitiveword;
import com.skytech.project.sms.model.T_Sms_Object;
import com.skytech.project.sms.model.T_Sms_Server_Monitor;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.sms.service.IT_SensitivewordService;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_sensitiveword")
public class T_SensitivewordController{

	@Resource(name="t_SensitivewordService")
	private IT_SensitivewordService t_SensitivewordService;


	/**
	 * 新增敏感词
	 * @return
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public ResultJO saveForm(@RequestBody T_Sensitiveword T_Sensitiveword) {

		String contents =T_Sensitiveword.getSensitive();
		String [] content = contents.trim().split(",");
		for(int i=0;i<content.length;i++){

			T_Sensitiveword t_sensitiveword=  new T_Sensitiveword();
			T_Sensitiveword.setDelstatus(0);
			T_Sensitiveword.setSensitive(content[i]);
			t_SensitivewordService.saveOrUpdateDynamic(T_Sensitiveword);
		}
		 return ResultJO.getDefaultResult(T_Sensitiveword, "保存成功！");

	}




	@RequestMapping(value = {"/list"})
	@ResponseBody
	public GridResult search(@RequestParam(value="keyword",required=false) String keyword,
							 @RequestParam(value="status",required=false) String status,
							 PageInfo pageInfo) {
		Map map  = new HashMap();
		map.put("keyword",keyword);
		map.put("status",status);

		return t_SensitivewordService.search(pageInfo, map);
	}

	/**
	 * 获取敏感词
	 * @return 当前部门
	 */
	@RequestMapping(value = "/loadSensitive")
	@ResponseBody
	public ResultJO loadForm( @RequestParam(value="ids",required=false) String ids) {
		if (StringUtil.isNullOrWhiteSpace(ids)) {
			return ResultJO.getErrorResult(null, "没有匹配的数据！");
		}
		return ResultJO.getDefaultResult(t_SensitivewordService.get(Long.parseLong(ids)));

	}


	/**
	 * 批量销毁通知
	 * @return
	 */
	@RequestMapping(value="/DestroyList",method = RequestMethod.POST)
	@ResponseBody
	public ResultJO destroyList(@RequestBody Map paramMap) {
		String ids =StringUtil.getStr(paramMap.get("ids")) ;
		String noWhiteSpaceIds = StringUtils.trimAllWhitespace(ids);
		if (StringUtils.hasLength(noWhiteSpaceIds)) {
			t_SensitivewordService.destroyList(StringUtil.makeNumberListFromString(ids, ",", Long.class));//物理删除
			return ResultJO.getDefaultResult(null, "删除成功！");
		}
		return ResultJO.getErrorResult(null, "请至少选择一条数据！");
	}



	/**
	 * 停用启用
	 * @return
	 */
	@RequestMapping(value="/updateStatus",method = RequestMethod.POST)
	@ResponseBody
	public ResultJO updateStatus(@RequestBody Map paramMap) {
		String ids = StringUtil.getStr(paramMap.get("ids")) ;
		String delstatus = StringUtil.getStr(paramMap.get("delstatus")) ;
		T_Sensitiveword T_Sensitiveword =new T_Sensitiveword();
		T_Sensitiveword.setDelstatus(Integer.parseInt(delstatus));
		T_Sensitiveword.setId(Long.valueOf(ids));
		t_SensitivewordService.saveOrUpdateWithNotNullProperties(T_Sensitiveword);
		return ResultJO.getDefaultResult(null, "修改成功！");
	}





}