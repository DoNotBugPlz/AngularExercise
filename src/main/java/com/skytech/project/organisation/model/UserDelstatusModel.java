package com.skytech.project.organisation.model;

import java.util.List;

/**
 * @author cr
 * @desc 用户状态model
 * @Time 2018/9/6 10:31
 */
public class UserDelstatusModel {

    private Integer delstatus;

    private List<Long> userExtIdList;

    public List<Long> getUserExtIdList() {
        return userExtIdList;
    }

    public void setUserExtIdList(List<Long> userExtIdList) {
        this.userExtIdList = userExtIdList;
    }

    public Integer getDelstatus() {
        return delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }
}
