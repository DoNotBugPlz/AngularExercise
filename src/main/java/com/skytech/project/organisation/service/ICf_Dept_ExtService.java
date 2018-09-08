package com.skytech.project.organisation.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.organisation.model.OrganisationPanelModel;
import com.skytech.organisation.model.Sys_Dept;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.organisation.model.Cf_Dept_Ext;
import com.skytech.project.organisation.model.DeptExtPanelModel;

import java.util.List;
import java.util.Map;

public interface ICf_Dept_ExtService extends IBaseService<Cf_Dept_Ext, Long> {
    GridResult loadPageListForConfig(OrganisationPanelModel var1, PageInfo var2);

    Sys_Dept saveForm(Sys_Dept dept, Cf_Dept_Ext deptExt);

    GridResult search(PageInfo pageinfo, Map map);

    Cf_Dept_Ext loadCfDeptExtBySysDeptId(String sysDeptId);

    /**
     * 根据deptID查询部门信息
     */
    Map<String, Object> getMonitorCenterById(String deptId);

    /** 保存或者更新部门信息 */
    DeptExtPanelModel saveOrUpdateDept(DeptExtPanelModel deptExtPanelModel);


    /**
     * 查询监测机构列表
     */
    GridResult loadDeptList(PageInfo pageInfo, Map map);

    /**
     * 获取当前部门以及子部门
     *
     * @param area_id
     * @return
     * @Author maxzhao
     */
    List<Long> getChildren(Long area_id);

    GridResult LoadDeptInfoList(OrganisationPanelModel panelmodel, PageInfo pageInfo);
}