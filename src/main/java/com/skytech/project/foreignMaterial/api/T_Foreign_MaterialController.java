package com.skytech.project.foreignMaterial.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;

import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.foreignMaterial.model.T_Foreign_Material;
import com.skytech.project.foreignMaterial.service.IT_Foreign_MaterialService;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_foreign_material")
public class T_Foreign_MaterialController{

	@Resource(name="t_Foreign_MaterialService")
	private IT_Foreign_MaterialService t_Foreign_MaterialService;

	/**
	 * 查询
	 * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
	 * @return GridResult
	 * @scope 对外监测材料列表
	 */
	@RequestMapping(value = {"/LoadForeignMaterialList"})
	@ResponseBody
	public GridResult loadList(
			@RequestParam(value = "foreign_material_name", required = false) String foreign_material_name, // 对外材料名称
			@RequestParam(value = "receive_dept_name", required = false) String receive_dept_name, // 发送对象
			@RequestParam(value = "adder", required = false) String adder, // 添加人
			@RequestParam(value = "start_time", required = false) String start_time, // 开始时间
			@RequestParam(value = "end_time", required = false) String end_time, // 结束时间
			@RequestParam(value = "review_status", required = false) String review_status, // 审核状态
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("foreign_material_name",foreign_material_name);
		map.put("receive_dept_name",receive_dept_name);
		map.put("adder",adder);
		map.put("start_time",start_time);
		map.put("end_time",end_time);
		map.put("review_status",review_status);
		return t_Foreign_MaterialService.loadList(pageInfo, map);
	}

	/**
	 * 新增或修改
	 * @return
	 */
	@RequestMapping(value = "/Save")
	@ResponseBody
	public ResultJO saveForm(@RequestBody T_Foreign_Material t_Foreign_Material, HttpSession session) {
		if(t_Foreign_Material != null){
			if (t_Foreign_Material.getDelstatus() == null){
				t_Foreign_Material.setDelstatus(0);
			}
			LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
			if(t_Foreign_Material.getId() != null){
				t_Foreign_Material.setModer(loginUserInf.getCurrentUserId());
				t_Foreign_Material.setModerdeptid(loginUserInf.getCurrentDeptId());
				t_Foreign_Material.setModtime(new Date());
			}else {
				t_Foreign_Material.setAdder(loginUserInf.getCurrentUserId());
				t_Foreign_Material.setAdderdeptid(loginUserInf.getCurrentDeptId());
				t_Foreign_Material.setAddtime(new Date());

			}
			t_Foreign_MaterialService.saveOrUpdate(t_Foreign_Material);
			return ResultJO.getDefaultResult(t_Foreign_Material, "保存成功！");
		}
		return ResultJO.getErrorResult(null, "保存失败！");
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
			t_Foreign_MaterialService.destroyList(StringUtil.makeNumberListFromString(noWhiteSpaceIds, ",", Long.class));//物理删除
			return ResultJO.getDefaultResult(null, "删除成功！");
		}
		return ResultJO.getErrorResult(null, "请至少选择一条数据！");
	}



















}