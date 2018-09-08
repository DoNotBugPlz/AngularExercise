package com.skytech.platform.authority.dao;

import com.skytech.organisation.model.Sys_User;
import com.skytech.persistence.dao.IDao;
import com.skytech.platform.authority.model.Sys_User_Roles;

import java.util.List;

public interface ISys_User_RolesDao extends IDao<Sys_User_Roles, String> {


    void deleteInfo(String user_id);


    List rolesListInfoByUserId(String user_id);

    Sys_User getRoleInfoById(String user_id);
}