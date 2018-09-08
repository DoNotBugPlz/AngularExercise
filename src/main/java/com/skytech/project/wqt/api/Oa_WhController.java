package com.skytech.project.wqt.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.wqt.model.Oa_Wh;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.wqt.service.IOa_WhService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/Oa_wh")
public class Oa_WhController{

	@Resource(name="oa_WhService")
	private IOa_WhService oa_WhService;

	/**
	 * 查询
	 * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
	 * @return GridResult
	 */
	@RequestMapping(value = {"/LoadWhList"})
	@ResponseBody
	public GridResult loadList(
			@RequestParam(value = "zh_name", required = false) String zh_name, // 文签头名称
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("zh_name", zh_name);
		return oa_WhService.loadList(pageInfo, map);
	}


	/**
	 * 新增或修改
	 * @return
	 */
	@RequestMapping(value = "/Save")
	@ResponseBody
	public ResultJO saveForm(@RequestBody Oa_Wh oa_wh, HttpSession session) {
		if(oa_wh != null){
			if (oa_wh.getDelstatus() == null){
				oa_wh.setDelstatus(0);
			}
			oa_WhService.saveOrUpdate(oa_wh);
			return ResultJO.getDefaultResult(oa_wh, "保存成功！");
		}
		return ResultJO.getErrorResult(null, "保存失败！");
	}

	/**
	 * 查询
	 * @return GridResult
	 */
	@RequestMapping(value = {"/getInfoById"})
	@ResponseBody
	public ResultJO getInfoById(
			@RequestParam(value = "id", required = false) String id) {
		if (StringUtil.isNullOrWhiteSpace(id)) {
			return ResultJO.getErrorResult(null, "没有匹配的数据！");
		}
		return ResultJO.getDefaultResult(oa_WhService.get(Long.parseLong(id)));

	}


    /**
	 * 禁用
	 * @return GridResult getDisableOrEnabe
	 */
	@RequestMapping(value = {"/getDisable"})
	@ResponseBody
	public ResultJO getDisable(@RequestParam("ids") String ids) {
		Oa_Wh oa_wh = null;
		if(ids != null){
			List<String> idList = StringUtil.makeListFromString(ids, ",", String.class);
			for (int i = 0; i < idList.size(); i++) {
				oa_wh = oa_WhService.get(Long.parseLong(idList.get(i)));
				oa_wh.setDelstatus(1);
				oa_WhService.saveOrUpdate(oa_wh);
			}
			return ResultJO.getDefaultResult(null, "禁用成功！");

		}
		return ResultJO.getErrorResult(null, "没有匹配的数据！");
	}


	/**
	 * 禁用
	 * @return GridResult getDisableOrEnabe
	 */
	@RequestMapping(value = {"/getEnabe"})
	@ResponseBody
	public ResultJO getEnabe(@RequestParam("ids") String ids) {
		Oa_Wh oa_wh = null;
		if(ids != null){
			List<String> idList = StringUtil.makeListFromString(ids, ",", String.class);
			for (int i = 0; i < idList.size(); i++) {
				oa_wh = oa_WhService.get(Long.parseLong(idList.get(i)));
				oa_wh.setDelstatus(0);
				oa_WhService.saveOrUpdate(oa_wh);
			}
			return ResultJO.getDefaultResult(null, "启用成功！");

		}
		return ResultJO.getErrorResult(null, "没有匹配的数据！");
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
			oa_WhService.destroyList(StringUtil.makeNumberListFromString(noWhiteSpaceIds, ",", Long.class));//物理删除
			return ResultJO.getDefaultResult(null, "删除成功！");
		}
		return ResultJO.getErrorResult(null, "请至少选择一条数据！");
	}










}