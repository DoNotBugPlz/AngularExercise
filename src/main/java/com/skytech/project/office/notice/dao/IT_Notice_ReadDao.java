package com.skytech.project.office.notice.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.office.notice.model.T_Notice_Read;

import java.util.Map;

public interface IT_Notice_ReadDao extends IDao<T_Notice_Read, String> {

    /**
     * 查询本人未读的通知公告
     * @param pageInfo
     * @param map
     * @return
     */
    GridResult searchSelf(PageInfo pageInfo, Map map);
}