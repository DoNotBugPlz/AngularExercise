package com.skytech.project.organisation.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.organisation.model.OrganisationPanelModel;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.organisation.model.Cf_Dept_Ext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface ICf_Dept_ExtDao extends IDao<Cf_Dept_Ext, Long> {
    GridResult loadPageListForConfig(OrganisationPanelModel var1, PageInfo var2);

    GridResult search(PageInfo pageinfo, Map map);

    Cf_Dept_Ext loadCfDeptExtBySysDeptId(String sysDeptId);

    /**
     * 获取监测机构列表
     */
    GridResult loadDeptList(PageInfo pageinfo, Map map);

    /**
     * 根据deptId获取部门信息
     */
    Map<String, Object> getMonitorCenterById(String deptId);

    /**
     * 获取当前部门以及子部门
     *
     * @param area_id
     * @return
     * @Author maxzhao
     */
    List<HashMap> getChildren(Long area_id);

    GridResult LoadDeptInfoList(OrganisationPanelModel panelmodel, PageInfo pageInfo);
}