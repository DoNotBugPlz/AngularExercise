package com.skytech.project.oa.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.oa.model.Oa_Fw;
import com.skytech.project.oa.model.Oa_Lw;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.oa.service.IOa_LwService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/Oa_lw")
public class Oa_LwController{

	@Resource(name="oa_LwService")
	private IOa_LwService oa_LwService;

	/**
	 * 查询
	 * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
	 * @return GridResult
	 */
	@RequestMapping(value = {"/LoadLwList"})
	@ResponseBody
	public GridResult loadList(
			@RequestParam(value = "key_value", required = false) String key_value, // 关键字
			@RequestParam(value = "start_time", required = false) String start_time, // 开始时间
			@RequestParam(value = "end_time", required = false) String end_time, // 结束时间
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("key_value",key_value);
		map.put("start_time",start_time);
		map.put("end_time",end_time);
		return oa_LwService.loadList(pageInfo, map);
	}

	/**
	 * 新增或修改
	 * @return
	 */
	@RequestMapping(value = "/Save", method = RequestMethod.POST)
	@ResponseBody
	public ResultJO saveForm(@RequestBody Oa_Lw oa_lw, HttpSession session) {
		if (oa_lw != null) {
			//获取当前登录用户信息
			LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
			if(oa_lw.getId()!=null){//修改
				oa_lw.setModer(loginUserInf.getCurrentUserId());
				oa_lw.setModerdeptid(loginUserInf.getCurrentDeptId());
				oa_lw.setModtime(new Date());
			}else{//新增
				oa_lw.setAdder(loginUserInf.getCurrentUserId());
				oa_lw.setAdderdeptid(loginUserInf.getCurrentDeptId());
				oa_lw.setAddtime(new Date());
			}
			oa_LwService.saveOrUpdate(oa_lw);
			return ResultJO.getDefaultResult(oa_lw, "保存成功！");
		}
		return ResultJO.getErrorResult(null, "保存失败！");
	}


	/**
	 * 获取对象
	 * @param id
	 * @return ResultJO
	 */
	@RequestMapping(value = "/LoadObj")
	@ResponseBody
	public ResultJO loadObj(@RequestParam(value = "id", required = false) String id) {
		if (StringUtil.isNullOrWhiteSpace(id)) {
			return ResultJO.getErrorResult(null, "没有匹配的数据！");
		}

		return ResultJO.getDefaultResult(oa_LwService.get(Long.parseLong(id)));
	}











}