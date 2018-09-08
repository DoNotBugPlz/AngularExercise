package com.skytech.project.organisation.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.organisation.model.Cf_User_Ext;

import java.util.Map;

public interface ICf_User_ExtDao extends IDao<Cf_User_Ext, Long> {
    /** 查询工作人员列表 */
    GridResult loadWorkUserList(PageInfo pageinfo, Map map);

    Cf_User_Ext loadCfUserExtBySysUserId(String sysUserId);
}