package com.skytech.project.office.notice.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.office.notice.dao.IT_NoticeDao;
import com.skytech.project.office.notice.service.IT_NoticeService;
import com.skytech.project.office.notice.model.T_Notice;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service("t_NoticeService")
public class T_NoticeService extends BaseService<T_Notice, String> implements IT_NoticeService {

    private IT_NoticeDao t_NoticeDao;

    @Resource(name = "t_NoticeDao")
    @Override
    public void setBaseDao(IDao<T_Notice, String> baseDao) {
        this.t_NoticeDao = (IT_NoticeDao) baseDao;
        this.baseDao = baseDao;
    }

    @Override
    public ResultJO search(PageInfo pageInfo, Map map) {
        /* 判断合法性 */
        if (StringUtil.isNullOrWhiteSpace(StringUtil.getStr(map.get("search_adderdeptid")))) {
            return ResultJO.getErrorResult(null, "非法用户：该用户部门不存在，请联系管理员。");
        }
        if (map == null) {
            return ResultJO.getErrorResult(null, "非法查询条件，请刷新重试。");
        }
        return ResultJO.getDefaultResult(t_NoticeDao.search(pageInfo, map));

    }


    @Override
    public String saveForm(Map params) {
        T_Notice t_notice = new T_Notice();
        if (StringUtil.isNullOrWhiteSpace(StringUtil.getStr(params.get("id")))) {
            //暂时把用户id 固定
            t_notice.setAdder((long) (Math.random() * 10000));
            t_notice.setAddtime(new Date());
            t_notice.setTitle(StringUtil.getStr(params.get("title")));
            t_notice.setContent(StringUtil.getStr(params.get("content")));
            t_notice.setData_type(Integer.parseInt(StringUtil.getStr(params.get("data_type"))));
            t_notice.setIs_public(Integer.parseInt(StringUtil.getStr(params.get("is_public"))));
            String user_id = t_NoticeDao.save(t_notice);
            return user_id;
        } else {
            t_NoticeDao.update(t_notice);
            return null;
        }
    }


    @Override
    public ResultJO getNoticeObject(String dept_id, long User_dept_id) {
        if (StringUtil.isNullOrWhiteSpace(StringUtil.getStr(dept_id))) {
            dept_id = t_NoticeDao.getSysDeptID(User_dept_id);
            return ResultJO.getDefaultResult(t_NoticeDao.getRootDept(dept_id));
        } else {
            List depts = t_NoticeDao.getChildrenDept(dept_id);
            return ResultJO.getDefaultResult(depts);
        }
    }

    @Override
    public List getDeptUsers(String User_dept_id) {
        return t_NoticeDao.getDeptUsers(User_dept_id);
    }

    @Override
    public List getDeptUsers(Long dept_id) {
        return t_NoticeDao.getDeptUsers(dept_id);
    }

    @Override
    public int delList(List<String> strings) {
        return t_NoticeDao.delList(strings);
    }

}