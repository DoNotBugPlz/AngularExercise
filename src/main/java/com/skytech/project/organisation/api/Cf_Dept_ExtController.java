package com.skytech.project.organisation.api;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.organisation.model.OrganisationPanelModel;
import com.skytech.organisation.model.Sys_Dept;
import com.skytech.organisation.service.IDeptService;
import com.skytech.project.organisation.model.DeptExtPanelModel;
import com.skytech.project.organisation.service.ICf_Dept_ExtService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/Cf_dept_ext")
public class Cf_Dept_ExtController{
	@Resource(name="cf_Dept_ExtService")
	private ICf_Dept_ExtService cf_Dept_ExtService;

	@Resource(name="deptService")
	private IDeptService deptService;


	@RequestMapping({"/LoadPageListForConfig"})
	@ResponseBody
	public GridResult loadPageListForConfig(OrganisationPanelModel panelmodel, PageInfo pageInfo) {
		return this.cf_Dept_ExtService.loadPageListForConfig(panelmodel, pageInfo);
	}


	@RequestMapping({"/LoadDeptInfoList"})
	@ResponseBody
	public GridResult LoadDeptInfoList(OrganisationPanelModel panelmodel, PageInfo pageInfo) {
		return this.cf_Dept_ExtService.LoadDeptInfoList(panelmodel, pageInfo);
	}



    /**
     * 查询监测机构列表
     * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return GridResult
     * @scope 监测机构
     */
    @RequestMapping(value = {"/LoadDeptList"})
    @ResponseBody
    public GridResult loadDeptList(
            @RequestParam(value = "chinaname", required = false) String chinaname,
            @RequestParam(value = "area_id", required = false) String area_id,
            @RequestParam(value = "dept_properties", required = false) String dept_properties,
            @RequestParam(value = "is_independent_office", required = false) String is_independent_office,
            @RequestParam(value = "min_person", required = false) String min_person,
            @RequestParam(value = "max_person", required = false) String max_person,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "zip_code", required = false) String zip_code,
            @RequestParam(value = "credit_code", required = false) String credit_code,
            @RequestParam(value = "leader_name", required = false) String leader_name,
            @RequestParam(value = "fax", required = false) String fax,
            @RequestParam(value = "warning_mobile", required = false) String warning_mobile,
            @RequestParam(value = "warning_telephone", required = false) String warning_telephone,
            @RequestParam(value = "delstatus", required = false) String delstatus,
            @RequestParam(value = "queryDept",required = false) String queryDept,
            PageInfo pageInfo) {
        Map map = new HashMap();
        map.put("chinaname", chinaname);
        map.put("area_id", area_id);
        map.put("dept_properties", dept_properties);
        map.put("is_independent_office", is_independent_office);
        map.put("min_person", min_person);
        map.put("max_person", max_person);
        map.put("address", address);
        map.put("zip_code", zip_code);
        map.put("credit_code", credit_code);
        map.put("leader_name", leader_name);
        map.put("fax", fax);
        map.put("warning_mobile", warning_mobile);
        map.put("warning_telephone", warning_telephone);
        map.put("delstatus", delstatus);
        map.put("queryDept",queryDept);
        return cf_Dept_ExtService.loadDeptList(pageInfo, map);
    }

//	/**
//	 * 新增或修改监测机构
//	 * @return
//	 */
//	@ResponseBody
//	@RequestMapping("/saveOrUpdateMonitorCenter")
//	public ResultJO saveOrUpdateMonitorCenter(@RequestBody DeptExtPanelModel pm) {
//		Sys_Dept dept = pm.getSys_dept();
//		Cf_Dept_Ext cf_Dept_Ext = pm.getCf_dept_ext();
//		dept = cf_Dept_ExtService.saveForm(dept,cf_Dept_Ext);
//		return ResultJO.getDefaultResult(dept);
//	}

	/**
	 * 新增或修改机构和部门
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/saveOrUpdateDept")
	public ResultJO saveOrUpdateDept(@RequestBody DeptExtPanelModel pm) {
        return ResultJO.getDefaultResult(cf_Dept_ExtService.saveOrUpdateDept(pm));
	}

	/**
	 * 获取当前监测中心或者部门信息
	 * @return
	 */
	@RequestMapping(value = "/getMonitorCenterById")
	@ResponseBody
	public ResultJO getMonitorCenterById(@RequestParam(value="id",required=false) String id) {
		if (StringUtil.isNullOrWhiteSpace(id)) {
			return ResultJO.getErrorResult(null, "没有匹配的数据！");
		}
		Map<String, Object> map = cf_Dept_ExtService.getMonitorCenterById(id);
		return ResultJO.getDefaultResult(map);
	}

	/**
	 * 获取当前部门
	 * @return
	 */
	@RequestMapping(value = "/getDeptInfoById")
	@ResponseBody
	public ResultJO getDeptInfoById( @RequestParam(value="id",required=false) String id) {
		if (StringUtil.isNullOrWhiteSpace(id)) {
			return ResultJO.getErrorResult(null, "没有匹配的数据！");
		}
		Sys_Dept dept = deptService.get(id);
		HashMap map = new HashMap<>();
		map.put("dept",dept);
		return ResultJO.getDefaultResult(map);
	}

	/**
	 * 获取当前监测中心工作人员列表
	 * @return
	 */
	@RequestMapping(value = {"monitorCenterList/list"})
	@ResponseBody
	public GridResult search(@RequestParam(value="dept_id",required=true) String dept_id,
							 @RequestParam(value="delstatus",required=false) String delstatus,
							 PageInfo pageInfo) {
		Map map  = new HashMap();
		map.put("dept_id",dept_id);
		map.put("delstatus",delstatus);
		return cf_Dept_ExtService.search(pageInfo, map);
	}

}