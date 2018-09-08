package com.skytech.project.organisation.api;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.organisation.model.Sys_User;
import com.skytech.organisation.service.IUserService;
import com.skytech.project.organisation.model.Cf_User_Ext;
import com.skytech.project.organisation.model.UserDelstatusModel;
import com.skytech.project.organisation.model.UserExtPanelModel;
import com.skytech.project.organisation.service.ICf_User_ExtService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/Cf_user_ext")
public class Cf_User_ExtController{
	@Resource(name="userService")
	private IUserService userService;

	@Resource(name="cf_User_ExtService")
	private ICf_User_ExtService cf_User_ExtService;

	/**
	 * 新增或修改监测机构工作人员
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/saveMonitorCenter")
	public ResultJO saveMonitorCenter(@RequestBody UserExtPanelModel pm) {
		Sys_User user = pm.getSys_user();
		Cf_User_Ext userExt = pm.getSys_user_ext();
		user = cf_User_ExtService.saveForm(user,userExt);
		return ResultJO.getDefaultResult(user);
	}

	/**
	 * 根据ID获取监测中心工作人员
	 * @return
	 */
	@RequestMapping(value = "/getMonitorCenterUserById")
	@ResponseBody
	public ResultJO getMonitorCenterById(@RequestParam(value="id",required=false) String id) {
		if (StringUtil.isNullOrWhiteSpace(id)) {
			return ResultJO.getErrorResult(null, "没有匹配的数据！");
		}
		Sys_User user = userService.get(id);
		Cf_User_Ext user_ext = cf_User_ExtService.loadCfUserExtBySysUserId(id);
		HashMap map = new HashMap<>();
		map.put("user",user);
		map.put("user_ext",user_ext);
		return ResultJO.getDefaultResult(map);
	}

	/**
	 * 获取当前监测中心工作人员列表
	 * @return
	 */
	@RequestMapping(value = "/LoadWorkUserList")
	@ResponseBody
	public GridResult loadWorkUserList(@RequestParam(value ="dept_id",required= false) String dept_id,
                                   @RequestParam(value ="parent_id",required = false) String parent_id,
                                   @RequestParam(value = "chinaname",required= false) String chinaname,
                                   @RequestParam(value = "sex",required= false) String sex,
                                   @RequestParam(value = "education",required= false) String education,
                                   @RequestParam(value = "birth",required= false) String birth,
                                   @RequestParam(value = "user_type",required= false) String user_type,
                                   @RequestParam(value = "area_id",required= false) String area_id,
                                   @RequestParam(value = "loginname",required= false) String loginname,
                                   @RequestParam(value = "unit_name",required= false) String unit_name,
                                   @RequestParam(value = "dept_name",required= false) String dept_name,
                                   @RequestParam(value = "zw",required= false) String zw,
                                   @RequestParam(value = "mobile",required= false) String mobile,
                                   @RequestParam(value = "phonedept",required= false) String phonedept,
                                   @RequestParam(value = "enter_post_date",required= false) String enter_post_date,
							       @RequestParam(value ="delstatus",required=false) String delstatus,
                                   PageInfo pageInfo) {
		Map map  = new HashMap();
		map.put("dept_id",dept_id);
		map.put("parent_id",parent_id);
		map.put("chinaname",chinaname);
		map.put("sex",sex);
		map.put("education",education);
		map.put("birth",birth);
		map.put("user_type",user_type);
		map.put("area_id",area_id);
		map.put("loginname",loginname);
		map.put("unit_name",unit_name);
		map.put("dept_name",dept_name);
		map.put("zw",zw);
		map.put("mobile",mobile);
		map.put("phonedept",phonedept);
		map.put("enter_post_date",enter_post_date);
		map.put("delstatus",delstatus);
		return cf_User_ExtService.loadWorkUserList(pageInfo, map);
	}

    /**
     * 修改用户状态
     * @return
     */
	@ResponseBody
    @RequestMapping(value = "/BatchModUserDelstatus",method = RequestMethod.POST)
	public ResultJO BatchModUserDelstatus(@RequestBody UserDelstatusModel data){
        if(data != null){
            List<Long> userExtIdList = data.getUserExtIdList();
            Integer delstatus = data.getDelstatus();
            cf_User_ExtService.batchModUserDelstatus(userExtIdList,delstatus);
            return ResultJO.getDefaultResult(data, "修改成功！");
        }
        return ResultJO.getErrorResult(data, "修改失败！");
    }
}