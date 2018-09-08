package com.skytech.project.organisation.model;

import com.skytech.basic.wrapper.SuperPanelModel;
import com.skytech.organisation.model.Sys_Dept;

public class DeptExtPanelModel extends SuperPanelModel {
	private Sys_Dept sys_dept;

	private Cf_Dept_Ext cf_dept_ext;

	public Sys_Dept getSys_dept() {
		return sys_dept;
	}

	public void setSys_dept(Sys_Dept sys_dept) {
		this.sys_dept = sys_dept;
	}

	public Cf_Dept_Ext getCf_dept_ext() {
		return cf_dept_ext;
	}

	public void setCf_dept_ext(Cf_Dept_Ext cf_dept_ext) {
		this.cf_dept_ext = cf_dept_ext;
	}
}
