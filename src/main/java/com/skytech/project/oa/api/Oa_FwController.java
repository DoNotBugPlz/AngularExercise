package com.skytech.project.oa.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.demo.model.T_Demo;
import com.skytech.project.oa.model.Oa_Fw;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.oa.service.IOa_FwService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/Oa_fw")
public class Oa_FwController{

	@Resource(name="oa_FwService")
	private IOa_FwService oa_FwService;

	/**
	 * 查询
	 * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
	 * @return GridResult
	 */
	@RequestMapping(value = {"/LoadFwList"})
	@ResponseBody
	public GridResult loadList(
				@RequestParam(value = "fw_name", required = false) String fw_name, // 发文标题
				@RequestParam(value = "emergency", required = false) String emergency, // 紧急
				@RequestParam(value = "file_type", required = false) String file_type, // 文件类型
				@RequestParam(value = "start_time", required = false) String start_time, // 开始时间
				@RequestParam(value = "end_time", required = false) String end_time, // 结束时间
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("fw_name",fw_name);
		map.put("emergency",emergency);
		map.put("file_type",file_type);
		map.put("start_time",start_time);
		map.put("end_time",end_time);
		return oa_FwService.loadList(pageInfo, map);
	}


	/**
	 * 新增或修改
	 * @return
	 */
	@RequestMapping(value = "/Save", method = RequestMethod.POST)
	@ResponseBody
	public ResultJO saveForm(@RequestBody Oa_Fw oa_fw, HttpSession session) {
		if (oa_fw != null) {
			//获取当前登录用户信息
			LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
			if(oa_fw.getId()!=null){//修改
				oa_fw.setModer(loginUserInf.getCurrentUserId());
				oa_fw.setModerdeptid(loginUserInf.getCurrentDeptId());
				oa_fw.setModtime(new Date());
			}else{//新增
				oa_fw.setAdder(loginUserInf.getCurrentUserId());
				oa_fw.setAdderdeptid(loginUserInf.getCurrentDeptId());
				oa_fw.setAddtime(new Date());
			}
			oa_FwService.saveOrUpdate(oa_fw);
			return ResultJO.getDefaultResult(oa_fw, "保存成功！");
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

		return ResultJO.getDefaultResult(oa_FwService.get(Long.parseLong(id)));
	}









}