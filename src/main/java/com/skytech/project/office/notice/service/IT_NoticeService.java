package com.skytech.project.office.notice.service;

import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.office.notice.model.T_Notice;

import java.util.List;
import java.util.Map;

public interface IT_NoticeService extends IBaseService<T_Notice, String> {

    /**
     * 查询本部门发布的通知公告
     *
     * @param pageInfo
     * @param map
     * @return
     */
    ResultJO search(PageInfo pageInfo, Map map);

    /**
     * 获取发布通知的对象
     * 当前用户所属单位及下属单位、相关监测机构监测点、采价员
     *
     * @param deptId
     * @return
     */
    ResultJO getNoticeObject(String deptId, long User_dept_id);

    /**
     * 查询当前部门下所有的用户ID
     *
     * @param dept_id
     * @return
     */
    List getDeptUsers(String dept_id);
    /**
     * 查询当前部门下所有的用户ID
     *
     * @param dept_id
     * @return
     */
    List getDeptUsers(Long dept_id);

    String saveForm(Map params);

    /**
     * 添加删除标识
     *
     * @param strings
     */
    int delList(List<String> strings);
}