package com.skytech.project.organisation.model;

import com.skytech.organisation.model.LoginUser;

/**
 * @author yangzr
 * @time 2018/8/8
 */
public class LoginUserInf extends LoginUser {
    private Cf_User_Ext cf_sys_User;

    //当前用户正式id
    private Long currentUserId;
    //当前用户所属部门正式id
    private Long currentDeptId;

    public Long getCurrentUserId() {
        return currentUserId;
    }

    public void setCurrentUserId(Long currentUserId) {
        this.currentUserId = currentUserId;
    }

    public Long getCurrentDeptId() {
        return currentDeptId;
    }

    public void setCurrentDeptId(Long currentDeptId) {
        this.currentDeptId = currentDeptId;
    }

    public Cf_User_Ext getCf_sys_User() {
        return cf_sys_User;
    }

    public void setCf_sys_User(Cf_User_Ext cf_sys_User) {
        this.cf_sys_User = cf_sys_User;
    }
}
