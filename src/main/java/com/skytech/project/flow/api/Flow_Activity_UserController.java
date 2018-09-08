package com.skytech.project.flow.api;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.flow.model.Flow_Activity_User;
import com.skytech.project.oa.model.Oa_Fw;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.flow.service.IFlow_Activity_UserService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/Flow_activity_user")
public class Flow_Activity_UserController{

	@Resource(name="flow_Activity_UserService")
	private IFlow_Activity_UserService flow_Activity_UserService;

	/**
	 * 查询
	 * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
	 * @return GridResult
	 */
	@RequestMapping(value = {"/LoadFauList"})
	@ResponseBody
	public GridResult loadList(
			@RequestParam(value = "def_process_key", required = false) String def_process_key, // 流程关键字
			@RequestParam(value = "def_activity_key", required = false) String def_activity_key, // 流程步骤关键字
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("def_process_key",def_process_key);
		map.put("def_activity_key",def_activity_key);
		return flow_Activity_UserService.LoadFauList(pageInfo, map);
	}

	/**
	 * 新增或修改
	 * @return
	 */
	@RequestMapping(value = "/Save", method = RequestMethod.POST)
	@ResponseBody
	public ResultJO saveForm(@RequestBody Flow_Activity_User flow_activity_user, HttpSession session) {
		if (flow_activity_user != null) {
			flow_Activity_UserService.saveOrUpdate(flow_activity_user);
			return ResultJO.getDefaultResult(flow_activity_user, "保存成功！");
		}
		return ResultJO.getErrorResult(null, "保存失败！");
	}

	/**
	 * 获取对象
	 * @return ResultJO
	 */
	@RequestMapping(value = "/LoadObj")
	@ResponseBody
	public ResultJO loadObj(@RequestParam(value = "flow_key", required = false) String flow_key,@RequestParam(value = "flow_step_key", required = false) String flow_step_key) {
		if (StringUtil.isNullOrWhiteSpace(flow_key) && StringUtil.isNullOrWhiteSpace(flow_step_key)) {
			return ResultJO.getErrorResult(null, "没有匹配的数据！");
		}
		Map map = new HashMap();
		map.put("flow_key",flow_key);
		map.put("flow_step_key",flow_step_key);
		Flow_Activity_User flow_activity_user =  flow_Activity_UserService.getFauInfo(map);
		return ResultJO.getDefaultResult(flow_activity_user);
	}

	/**
	 * 删除
	 * @return
	 */
	@RequestMapping(value="/DestroyList",method = RequestMethod.POST)
	@ResponseBody
	public ResultJO destroyList(@RequestBody Map paramMap) {
		String ids =StringUtil.getStr(paramMap.get("ids")) ;
		String noWhiteSpaceIds = StringUtils.trimAllWhitespace(ids);
		if (StringUtils.hasLength(noWhiteSpaceIds)) {
			flow_Activity_UserService.destroyList(StringUtil.makeNumberListFromString(noWhiteSpaceIds, ",", Long.class));//物理删除
			return ResultJO.getDefaultResult(null, "删除成功！");
		}
		return ResultJO.getErrorResult(null, "请至少选择一条数据！");
	}











}