package com.skytech.platform.authority.dao.imp;

import com.skytech.organisation.model.Sys_User;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.platform.authority.dao.ISys_User_RolesDao;
import com.skytech.platform.authority.model.Sys_User_Roles;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("sys_User_RolesDao")
public class Sys_User_RolesDao extends MainBaseDao<Sys_User_Roles, String> implements ISys_User_RolesDao {


    @Override
    public void deleteInfo(String user_id) {
        List<Object> list = new ArrayList();
        list.add(user_id);
        String sql = "delete from sys_user_roles  where user_id = ?";
        this.execteNativeBulk(sql,list);
    }


    @Override
    public List rolesListInfoByUserId(String user_id) {
        List<Object> list = new ArrayList();
        list.add(user_id);
        String hql = "from Sys_User_Roles s where s.user_id = ? ";
        return this.list(hql,list);
    }

    @Override
    public Sys_User getRoleInfoById(String user_id) {
        List<Object> list = new ArrayList();
        list.add(user_id);
        String hql = " from Sys_User s where s.id = ? ";
        Sys_User sys_user = this.unique(hql,list);
        return sys_user;
    }
}