package com.skytech.project.demo.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.demo.model.T_Demo;
import com.skytech.project.notice.model.Notice;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.demo.service.IT_DemoService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_demo")
public class T_DemoController{

	@Resource(name="t_DemoService")
	private IT_DemoService t_DemoService;

	/**
	 * 查询
	 * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
	 * @return GridResult
	 * @scope 监测机构
	 */
	@RequestMapping(value = {"/LoadList"})
	@ResponseBody
	public GridResult loadList(
			@RequestParam(value = "keyword", required = false) String keyword,
			@RequestParam(value = "start_time", required = false) String start_time,
			@RequestParam(value = "end_time", required = false) String end_time,
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("keyword", keyword);
		map.put("start_time", start_time);
		map.put("end_time", end_time);
		return t_DemoService.loadList(pageInfo, map);
	}



	/**
	 * 新增或修改
	 * @return
	 */
	@RequestMapping(value = "/Save", method = RequestMethod.POST)
	@ResponseBody
	public ResultJO saveForm(@RequestBody T_Demo demo, HttpSession session) {
		if (demo != null) {
			if(demo.getDelstatus() == null) {
				demo.setDelstatus(0);
			}
			//获取当前登录用户信息
			LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
			if(demo.getId()!=null){//修改
				demo.setModer(loginUserInf.getCurrentUserId());
				demo.setModerdeptid(loginUserInf.getCurrentDeptId());
				demo.setModtime(new Date());
			}else{//新增
				demo.setAdder(loginUserInf.getCurrentUserId());
				demo.setAdderdeptid(loginUserInf.getCurrentDeptId());
				demo.setAddtime(new Date());
			}
			t_DemoService.saveOrUpdate(demo);
			return ResultJO.getDefaultResult(demo, "保存成功！");
		}
		return ResultJO.getErrorResult(null, "保存失败！");
	}
	/**
	 * 获取对象
	 * @param id 材料id
	 * @return ResultJO
	 */
	@RequestMapping(value = "/LoadObj")
	@ResponseBody
	public ResultJO loadObj(@RequestParam(value = "id", required = false) String id) {
		if (StringUtil.isNullOrWhiteSpace(id)) {
			return ResultJO.getErrorResult(null, "没有匹配的数据！");
		}

		return ResultJO.getDefaultResult(t_DemoService.get(Long.parseLong(id)));
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
			t_DemoService.destroyList(StringUtil.makeNumberListFromString(noWhiteSpaceIds, ",", Long.class));//物理删除
			return ResultJO.getDefaultResult(null, "删除成功！");
		}
		return ResultJO.getErrorResult(null, "请至少选择一条数据！");
	}

}