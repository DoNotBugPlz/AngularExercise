package com.skytech.platform.authority.service.imp;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.organisation.dao.IUserDao;
import com.skytech.organisation.model.Sys_User;
import com.skytech.organisation.service.IUserService;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.platform.authority.dao.ISys_User_RolesDao;
import com.skytech.platform.authority.model.Sys_User_Roles;
import com.skytech.platform.authority.service.ISys_User_RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("sys_User_RolesService")
public class Sys_User_RolesService extends BaseService<Sys_User_Roles, String> implements ISys_User_RolesService {
	@Resource(name = "userDao")
	private IUserDao userDao;

	private ISys_User_RolesDao sys_User_RolesDao;
	@Resource(name="sys_User_RolesDao")
	@Override
	public void setBaseDao(IDao<Sys_User_Roles, String> baseDao) {
		this.sys_User_RolesDao = (ISys_User_RolesDao)baseDao;
		this.baseDao = baseDao;
	}



	@Override
	public ResultJO saveUserRoles(String user_id, String ids) {
		if (!StringUtil.isNullOrWhiteSpace(user_id) && !StringUtil.isNullOrWhiteSpace(ids)){
			sys_User_RolesDao.deleteInfo(user_id);
			String[] roleIds = ids.split(",");
			for(int i = 0; i < roleIds.length; ++i) {
				Sys_User_Roles sys_user_roles = new Sys_User_Roles();
				sys_user_roles.setUser_id(user_id);
				sys_user_roles.setRole_id(roleIds[i]);
				sys_User_RolesDao.saveOrUpdate(sys_user_roles);
			}
			return ResultJO.getDefaultResult(true, "保存成功！");
		}
		return ResultJO.getErrorResult(false, "保存失败！");
	}

	@Override
	public void delInfoByPkID(String pkId) {
		sys_User_RolesDao.destroy(pkId);
	}

	@Override
	public String selectRoseInfo(String user_id) {
		String rolesStr = "";
		if(!StringUtil.isNullOrWhiteSpace(user_id)){
			List<Sys_User_Roles> userRolesList =sys_User_RolesDao.rolesListInfoByUserId(user_id);
			if(userRolesList!=null&&userRolesList.size() > 0 ){
				for (int i = 0; i < userRolesList.size(); i++) {
					Sys_User_Roles userRoles = userRolesList.get(i);
					if(i == 0){
						rolesStr +=userRoles.getRole_id();
					}else{
						rolesStr += "," + userRoles.getRole_id();
					}
				}
			}
		}
		return rolesStr;
	}

	@Override
	public ResultJO updateRoleInfoById(String user_id) {
		String rolesStr = this.selectRoseInfo(user_id);
		if(!StringUtil.isNullOrWhiteSpace(user_id)){
			Sys_User sys_user = userDao.get(user_id);
			if(sys_user != null){
				sys_user.setPersonroles(rolesStr);
				userDao.update(sys_user);
			}
			return ResultJO.getDefaultResult(true, "保存成功！");
		}
		return ResultJO.getErrorResult(false, "保存失败！");
	}


}