package com.skytech.platform.authority.service;

import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.service.IBaseService;
import com.skytech.platform.authority.model.Sys_User_Roles;

public interface ISys_User_RolesService extends IBaseService<Sys_User_Roles, String> {


    ResultJO saveUserRoles(String user_id, String ids);

    void delInfoByPkID(String pkId);

    String selectRoseInfo(String user_id);

    ResultJO updateRoleInfoById(String user_id);



}