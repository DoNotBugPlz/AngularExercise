package com.skytech.project.office.notice.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.project.office.notice.dao.IT_Notice_ReadDao;
import com.skytech.project.office.notice.model.T_Notice_Read;
import com.skytech.project.office.notice.service.IT_Notice_ReadService;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;

import java.util.Date;
import java.util.Map;

@Service("t_Notice_ReadService")
public class T_Notice_ReadService extends BaseService<T_Notice_Read, String> implements IT_Notice_ReadService {

    private IT_Notice_ReadDao t_Notice_ReadDao;

    @Resource(name = "t_Notice_ReadDao")
    @Override
    public void setBaseDao(IDao<T_Notice_Read, String> baseDao) {
        this.t_Notice_ReadDao = (IT_Notice_ReadDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public ResultJO readNotices(String object_ids, Long user_id) {
        if (StringUtil.hasLength(object_ids)) {
            T_Notice_Read t_notice_read;
            String[] notice_idList = object_ids.split(",");
            for (String object_id : notice_idList) {
                if (StringUtil.hasLength(object_id)) {
                    t_notice_read = new T_Notice_Read();
                    t_notice_read.setUser_id(user_id);
                    t_notice_read.setRead_time(new Date());
                    t_notice_read.setNotice_object_id(object_id);
                    t_notice_read.setIs_read(1);
                    t_Notice_ReadDao.save(t_notice_read);
                }
            }
            return ResultJO.getDefaultResult(null, "设置成功！");
        }
        return ResultJO.getErrorResult(null, "设置失败！");
    }

    @Override
    public GridResult searchSelf(PageInfo pageInfo, Map map) {
        return t_Notice_ReadDao.searchSelf(pageInfo, map);
    }

}