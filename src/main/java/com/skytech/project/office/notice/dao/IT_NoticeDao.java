package com.skytech.project.office.notice.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.office.notice.model.T_Notice;

import java.util.List;
import java.util.Map;

public interface IT_NoticeDao extends IDao<T_Notice, String> {

    /**
     * 查询本部门发布的通知公告
     * @param pageInfo
     * @param map
     * @return
     */
    GridResult search(PageInfo pageInfo, Map map);

    /**
     * 获取下级部门列表
     * @param dept_id
     * @return
     */
    List getChildrenDept(String dept_id);

    /**
     * 获取部门下人员列表
     * @param dept_id
     * @return
     */
    List getDeptUsers(String dept_id);
    /**
     * 获取部门下人员列表
     * @param dept_id
     * @return
     */
    List getDeptUsers(Long dept_id);
    /**
     * 获取顶级部门列表
     * @param dept_id
     * @return
     */
    List getRootDept(String dept_id);

    /**
     * 修改删除标识
     * @param strings
     */
    int delList(List<String> strings);

    /**
     * 获取系统部门表的主键
     * @param user_dept_id
     * @return
     */
    String getSysDeptID(long user_dept_id);
}