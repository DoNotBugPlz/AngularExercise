package com.skytech.project.office.notice.service.imp;

import javax.annotation.Resource;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.office.notice.dao.IT_Notice_ObjectDao;
import com.skytech.project.office.notice.service.IT_Notice_ObjectService;
import com.skytech.project.office.notice.model.T_Notice_Object;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("t_Notice_ObjectService")
public class T_Notice_ObjectService extends BaseService<T_Notice_Object, String> implements IT_Notice_ObjectService {

    private IT_Notice_ObjectDao t_Notice_ObjectDao;

    @Resource(name = "t_Notice_ObjectDao")
    @Override
    public void setBaseDao(IDao<T_Notice_Object, String> baseDao) {
        this.t_Notice_ObjectDao = (IT_Notice_ObjectDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public void saveObjects(String user_ids, String notice_id) {
        if (!StringUtil.isNullOrWhiteSpace(user_ids)) {
            String[] ids = user_ids.trim().split(",");
            T_Notice_Object t_notice_object = null;
            for (String id : ids) {
                t_notice_object = new T_Notice_Object();
                t_notice_object.setNotice_id(notice_id);
                t_notice_object.setUser_id(Long.parseLong(id));
                t_notice_object.setObject_type(4);
                t_notice_object.setDelstatus(0);
                t_Notice_ObjectDao.save(t_notice_object);
            }
        }
    }

    @Override
    public void updateObjects(String user_ids, String notice_id) {
        if (!StringUtil.isNullOrWhiteSpace(user_ids) && !StringUtil.isNullOrWhiteSpace(notice_id)) {
            /* 修改后的user_id 转换成list*/
            List<Long> user_idList = StringUtil.makeNumberListFromString(user_ids, ",", Long.class);
            /* 逻辑删除多余的用户 */
            t_Notice_ObjectDao.delObjectList(user_idList, notice_id);
            this.saveObjects(user_ids, notice_id);
        }
    }

    @Override
    public List getNoticeObjects(Map noticeId) {
        return t_Notice_ObjectDao.getNoticeObjects(noticeId);
    }
}