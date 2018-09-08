package com.skytech.project.organisation.model;

import com.skytech.basic.wrapper.SuperPanelModel;
import com.skytech.organisation.model.Sys_User;

public class UserExtPanelModel extends SuperPanelModel {
	private Sys_User sys_user;

	private Cf_User_Ext sys_user_ext;

	public Sys_User getSys_user() {
		return sys_user;
	}

	public void setSys_user(Sys_User sys_user) {
		this.sys_user = sys_user;
	}

	public Cf_User_Ext getSys_user_ext() {
		return sys_user_ext;
	}

	public void setSys_user_ext(Cf_User_Ext sys_user_ext) {
		this.sys_user_ext = sys_user_ext;
	}
}
