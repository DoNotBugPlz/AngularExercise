package com.skytech.platform.authority.api;

import com.skytech.basic.wrapper.ResultJO;
import com.skytech.platform.authority.service.ISys_User_RolesService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/Sys_user_roles")
public class Sys_User_RolesController{

	@Resource(name="sys_User_RolesService")
	private ISys_User_RolesService sys_User_RolesService;


	/**
	 * @param user_id
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "/Save")
	@ResponseBody
	public ResultJO saveForm(
			@RequestParam(value = "user_id", required = false) String user_id,
			@RequestParam(value = "ids", required = false) String ids) {
		//sys_User_RolesService.saveUserRoles(user_id,ids);
		sys_User_RolesService.updateRoleInfoById(user_id);
		return null;
	}








}