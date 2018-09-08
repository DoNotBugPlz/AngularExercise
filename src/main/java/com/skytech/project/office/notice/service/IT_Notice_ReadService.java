package com.skytech.project.office.notice.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.office.notice.model.T_Notice_Read;

import java.util.Map;

public interface IT_Notice_ReadService extends IBaseService<T_Notice_Read, String> {

    /**
     * 保存一组 通知已读信息
     * @param object_ids 通知对象ids="id1,id2"
     * @return
     */
    ResultJO readNotices(String object_ids, Long user_id);

    /**
     * 查询自己未读的通知公告
     *
     * @param pageInfo
     * @param map
     * @return
     */
    GridResult searchSelf(PageInfo pageInfo, Map map);
}