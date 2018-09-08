package com.skytech.project.wqt.api;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.foreignMaterial.model.T_Foreign_Material;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.wqt.model.Oa_Wqt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.wqt.service.IOa_WqtService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/Oa_wqt")
public class Oa_WqtController{

	@Resource(name="oa_WqtService")
	private IOa_WqtService oa_WqtService;


	/**
	 * 查询
	 * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
	 * @return GridResult
	 */
	@RequestMapping(value = {"/LoadWqtList"})
	@ResponseBody
	public GridResult loadList(
			@RequestParam(value = "wqt_name", required = false) String wqt_name, // 文签头名称
			PageInfo pageInfo) {
        Map map = new HashMap();
        map.put("wqt_name", wqt_name);
        return oa_WqtService.loadList(pageInfo, map);
    }

	/**
	 * 查询
	 * @return GridResult
	 */
	@RequestMapping(value = {"/getInfoById"})
	@ResponseBody
	public ResultJO getInfoById(
			@RequestParam(value = "id", required = false) String id, // id
			PageInfo pageInfo) {
		if (StringUtil.isNullOrWhiteSpace(id)) {
			return ResultJO.getErrorResult(null, "没有匹配的数据！");
		}
		return ResultJO.getDefaultResult(oa_WqtService.get(Long.parseLong(id)));

	}





	/**
	 * 新增或修改
	 * @return
	 */
	@RequestMapping(value = "/Save")
	@ResponseBody
	public ResultJO saveForm(@RequestBody Oa_Wqt oa_wqt, HttpSession session) {
		if(oa_wqt != null){
			if (oa_wqt.getDelstatus() == null){
				oa_wqt.setDelstatus(0);
			}
			LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
			if(oa_wqt.getId() != null){
				oa_wqt.setModer(loginUserInf.getCurrentUserId());
				oa_wqt.setModerdeptid(loginUserInf.getCurrentDeptId());
				oa_wqt.setModtime(new Date());
			}else {
				oa_wqt.setAdder(loginUserInf.getCurrentUserId());
				oa_wqt.setAdderdeptid(loginUserInf.getCurrentDeptId());
				oa_wqt.setAddtime(new Date());

			}
			oa_WqtService.saveOrUpdate(oa_wqt);
			return ResultJO.getDefaultResult(oa_wqt, "保存成功！");
		}
		return ResultJO.getErrorResult(null, "保存失败！");
	}













	}