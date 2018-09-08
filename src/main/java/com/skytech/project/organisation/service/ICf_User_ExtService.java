package com.skytech.project.organisation.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.organisation.model.Sys_User;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.organisation.model.Cf_User_Ext;

import java.util.List;
import java.util.Map;

public interface ICf_User_ExtService extends IBaseService<Cf_User_Ext, Long> {
    Sys_User saveForm(Sys_User user, Cf_User_Ext userExt);

    /**
     * 获取工作人员列表
     * @param pageinfo
     * @param map
     * @return
     */
    GridResult loadWorkUserList(PageInfo pageinfo, Map map);

    Cf_User_Ext loadCfUserExtBySysUserId(String id);

    /**
     * 批量修改用户状态
     * @param userList
     * @param delstatus
     */
    void batchModUserDelstatus(List<Long>userList, Integer delstatus);
}