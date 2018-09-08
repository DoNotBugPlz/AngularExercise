package com.skytech.project.goodsReferenceLib.cfIndexManage.model;

import com.skytech.basic.wrapper.SuperPanelModel;
import com.skytech.category.model.Sys_Category;
import com.skytech.category.model.Sys_Categoryvalue;

import java.util.List;

public class cfIndexModel extends SuperPanelModel {
	private Cf_Index cf_index;
	private Sys_Category sys_category;
	private List<Sys_Categoryvalue> list;

	public Cf_Index getCf_index() {
		return cf_index;
	}

	public void setCf_index(Cf_Index cf_index) {
		this.cf_index = cf_index;
	}

	public Sys_Category getSys_category() {
		return sys_category;
	}

	public void setSys_category(Sys_Category sys_category) {
		this.sys_category = sys_category;
	}

	public List<Sys_Categoryvalue> getList() {
		return list;
	}

	public void setList(List<Sys_Categoryvalue> list) {
		this.list = list;
	}
}
