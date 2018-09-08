package com.skytech.project.office.notice.dao;

import com.skytech.persistence.dao.IDao;
import com.skytech.project.office.notice.model.T_Notice_Object;

import java.util.List;
import java.util.Map;

public interface IT_Notice_ObjectDao extends IDao<T_Notice_Object, String> {

    /**
     * 删除不在ids中的数据
     *
     * @param user_ids
     * @param notice_id
     * @return
     */
    int delObjectList(List<Long>  user_ids,  String notice_id);

    /**
     * 获取当前通知的所有通知人
     *
     * @param noticeId
     * @return
     */
    List getNoticeObjects(Map noticeId);
}