package com.skytech.project.organisation.service.imp;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.organisation.model.OrganisationPanelModel;
import com.skytech.organisation.model.Sys_Dept;
import com.skytech.organisation.service.IDeptService;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.organisation.dao.ICf_Dept_ExtDao;
import com.skytech.project.organisation.model.Cf_Dept_Ext;
import com.skytech.project.organisation.model.DeptExtPanelModel;
import com.skytech.project.organisation.service.ICf_Dept_ExtService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("cf_Dept_ExtService")
public class Cf_Dept_ExtService extends BaseService<Cf_Dept_Ext, Long> implements ICf_Dept_ExtService {
    @Resource(name = "deptService")
    private IDeptService deptService;
    private ICf_Dept_ExtDao cf_Dept_ExtDao;

    @Override
    @Resource(name = "cf_Dept_ExtDao")
    public void setBaseDao(IDao<Cf_Dept_Ext, Long> baseDao) {
        this.cf_Dept_ExtDao = (ICf_Dept_ExtDao) baseDao;
        this.baseDao = baseDao;
    }

    public GridResult loadPageListForConfig(OrganisationPanelModel panelmodel, PageInfo pageinfo) {
        return this.cf_Dept_ExtDao.loadPageListForConfig(panelmodel, pageinfo);
    }

    @Override
    public Sys_Dept saveForm(Sys_Dept dept, Cf_Dept_Ext deptExt) {
        boolean isAdd = false;
        if (StringUtil.isNullOrWhiteSpace(dept.getId())) {
            isAdd = true;
        }
        if (isAdd) {
            dept = deptService.save(dept);
        } else {
            deptService.update(dept);
        }
        deptExt.setSys_dept_id(dept.getId());
        deptExt.setDelstatus(dept.getDelstatus());
        if (StringUtil.isNullOrWhiteSpace("" + deptExt.getId())) {
            cf_Dept_ExtDao.save(deptExt);
        } else {
            cf_Dept_ExtDao.update(deptExt);
        }
        return dept;
    }

    /**
     * 查询人员列表，可以传查询条件
     */
    @Override
    public GridResult search(PageInfo pageinfo, Map map) {
        return cf_Dept_ExtDao.search(pageinfo, map);
    }

    @Override
    public Cf_Dept_Ext loadCfDeptExtBySysDeptId(String sysDeptId) {
        return cf_Dept_ExtDao.loadCfDeptExtBySysDeptId(sysDeptId);
    }

    /**
     * 查询监测机构列表
     * @param pageInfo
     * @param map
     * @return
     */
    @Override
    public GridResult loadDeptList(PageInfo pageInfo, Map map) {
        return cf_Dept_ExtDao.loadDeptList(pageInfo, map);
    }

    /**
     * 通过deptId获取部门信息
     *
     * @param deptId
     * @return
     */
    @Override
    public Map<String, Object> getMonitorCenterById(String deptId) {
        return cf_Dept_ExtDao.getMonitorCenterById(deptId);
    }

    @Override
    public  List<Long> getChildren(Long area_id) {
        List<HashMap> result = cf_Dept_ExtDao.getChildren(area_id);
        List<Long> area_ids = new ArrayList<>();
        for (HashMap map : result) {
            String id = StringUtil.getStr(map.get("id"));
            if (!StringUtil.isNullOrWhiteSpace(id)) {
                area_ids.add(Long.parseLong(id));
            }
        }
        return area_ids;
    }

    @Override
    public GridResult LoadDeptInfoList(OrganisationPanelModel panelmodel, PageInfo pageInfo) {
        return cf_Dept_ExtDao.LoadDeptInfoList(panelmodel,pageInfo);
    }

    /**
     * 保存或者更新机构(部门)信息
     * @param dm
     * @return
     */
    @Override
    public DeptExtPanelModel saveOrUpdateDept(DeptExtPanelModel dm) {
        Sys_Dept sys_Dept = dm.getSys_dept();
        Cf_Dept_Ext cf_Dept_Ext = dm.getCf_dept_ext();
        try {
            if(!StringUtil.isNullOrWhiteSpace(sys_Dept.getId())){// 修改
                deptService.updateWithNotNullProperties(sys_Dept);
            }else{
                deptService.save(sys_Dept);
                //如果是监测机构,更新所属单位字段
                if(sys_Dept.getDeptlevel().intValue() == 1){
                    sys_Dept.setUnitid(sys_Dept.getId());
                }
            }
            cf_Dept_Ext.setSys_dept_id(sys_Dept.getId());
            cf_Dept_ExtDao.saveOrUpdateWithNotNullProperties(cf_Dept_Ext);
        }catch (Exception e){
            e.printStackTrace();
        }
        return dm;
    }
}