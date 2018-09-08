package com.skytech.project.office.notice.service;

import com.skytech.persistence.service.IBaseService;
import com.skytech.project.office.notice.model.T_Notice_Object;

import java.util.List;
import java.util.Map;

public interface IT_Notice_ObjectService extends IBaseService<T_Notice_Object, String> {

    /**
     * 保存接收通知的对象
     *
     * @param user_ids
     * @param notice_id
     */
    void saveObjects(String user_ids, String notice_id);

    /**
     * 修改接收通知的对象
     *
     * @param user_ids
     * @param id
     */
    void updateObjects(String user_ids, String id);

    /**
     * 获取当前通知的所有通知人
     *
     * @param noticeId
     * @return
     */
    List getNoticeObjects(Map noticeId);
}